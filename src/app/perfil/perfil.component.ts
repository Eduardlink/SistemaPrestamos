import { Component } from '@angular/core';
import { RegistroService } from '../servicios/registro.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  usuario: string = '';
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  telefono: string = '';
  idCliente: number = 0; // Variable para almacenar el ID del cliente

  constructor(private _registroService: RegistroService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    // Recuperar el ID del cliente del almacenamiento local al iniciar el componente
    this.idCliente = Number(localStorage.getItem('idCliente'));
  
    // Obtener la información del usuario y asignarla a las variables del componente
    this._registroService.getUsuarios(this.idCliente).subscribe((data: any) => {
      this.usuario = data.usuario;
      this.nombre = data.nombre;
      this.apellido = data.apellido;
      this.correo = data.correo;
      this.telefono = data.telefono;
    }, error => {
      this.toastr.error('Ocurrió un error al obtener la información del perfil', 'Error');
    });
  }
  
  

  updatePerfil() {
    if (this.usuario == '' || this.nombre == '' || this.apellido == '' || this.correo == '' || this.telefono == '') {
      this.toastr.error('Por favor, complete todos los campos para actualizar su perfil', 'Error');
      return;
    }

    // Crear el objeto de registro con los datos del usuario a actualizar
    const registro = {
      usuario: this.usuario,
      contrasenia: '',
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      telefono: this.telefono,
      rol: ''
    }

    // Llamar al método de actualización de perfil en el servicio, pasando el ID del cliente y los datos del usuario
    this._registroService.updatePerfil(this.idCliente, registro).subscribe((data: any) => {
      this.toastr.success('Perfil actualizado correctamente', 'Exito');
    }, error => {
      this.toastr.error('Ocurrió un error al actualizar el perfil', 'Error');
    });
  }
}
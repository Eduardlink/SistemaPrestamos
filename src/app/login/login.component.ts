import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../servicios/registro.service';
import { ToastrService } from 'ngx-toastr';
import { Registro } from '../interfaces/registro';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string = '';
  contrasenia: string = '';
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  telefono: string = '';
  rol: string = '';

  constructor(private toastr: ToastrService,
    private _registroService: RegistroService,
    private router: Router) { }


  ngOnInit(): void {
  }

  login() {
    if (this.correo === '' || this.contrasenia === '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    const registro: Registro = {
      usuario: this.usuario,
      contrasenia: this.contrasenia,
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      telefono: this.telefono,
      rol: this.rol
    }

    this._registroService.login(registro).subscribe((data: any) => {
      if (data && data.rol) {
        // Almacenar el rol del usuario en localStorage o sessionStorage
        localStorage.setItem('rolUsuario', data.rol);
        localStorage.setItem('idCliente', data.id_Cliente);
        // Redirigir a la página principal
        this.router.navigate(['/principal']);

        // Mostrar un mensaje de éxito
        this.toastr.success(`Bienvenido, ${data.usuario}`, 'Exito');
      } else {
        this.toastr.error('El correo o la contraseña son incorrectos', 'Error');
      }
    }, (error: HttpErrorResponse) => {
      this.toastr.error('El correo o la contraseña son incorrectos', 'Error');
    });

  }


}
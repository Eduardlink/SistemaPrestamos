import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';

import { Registro } from '../interfaces/registro';
import { ToastrService } from 'ngx-toastr';
import { RegistroService } from '../servicios/registro.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BancoService } from '../servicios/banco.service';
import { Banco2 } from '../interfaces/banco2';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  pantallaActual: string = 'pagos';
  adminSelected: boolean = false;
  idClienteRegistrado!: number;

  id_Cliente: number = 0;
  usuario: string = '';
  contrasenia: string = '';
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  telefono: string = '';
  rol: string = 'Admin';
  idBancoRegistrado: number = 0;

  id_Banco!: number;
  nombreB!: string;
  logo!: string;
  direccion!: string;
  id_Administrador!: number;

  constructor(private toastr: ToastrService,
    private _registroService: RegistroService,
    private _bancosService: BancoService,
    private router: Router,
    private location: Location) {

  }

  ngOnInit(): void {
  }

  regresar() {
    // Navega de vuelta a la página anterior
    this.location.back();
  }

  addRegistro() {
    // Verificar si todos los campos obligatorios están llenos
    if (this.usuario == '' || this.contrasenia == '' || this.nombre == '' || this.apellido == '' || this.correo == '' || this.telefono == '' || this.rol == '') {
      this.toastr.error('Por favor, complete todos los campos para registrar un usuario', 'Error');
      return;
    }
    //validar que el correo sea valido
    const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!pattern.test(this.correo)) {
      this.toastr.error('Por favor, ingrese un correo electrónico válido.', 'Correo Inválido');
      return;
    }
    // Validar que el teléfono contenga solo números
    const phonePattern = /^[0-9]*$/;
    if (!phonePattern.test(this.telefono)) {
      this.toastr.error('Por favor, ingrese solo números en el campo de teléfono.', 'Teléfono Inválido');
      return;
    }


    if (this.rol === 'Admin') {
      const modal = document.getElementById('exampleModalToggle');
      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
        modal.setAttribute('aria-modal', 'true');
      }
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


    this._registroService.signIn(registro).subscribe({
      next: (response: any) => {
        this.toastr.success(`El usuario ${this.usuario} fue registrado con exito`, 'Usuario Registrado');
        this.idClienteRegistrado = response.id;
        console.log(registro);
      },
      error: (e: HttpErrorResponse) => {
        this.toastr.error('Error al registrar el usuario', 'Error');
      }
    });
  }



  closeModal() {
    const modal = document.getElementById('exampleModalToggle');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-modal', 'false');
    }
  }

  addBanco() {
    // Verificar si todos los campos obligatorios están llenos
    if (!this.nombreB || !this.logo || !this.direccion) {
      this.toastr.error('Por favor, complete todos los campos para registrar un banco', 'Error');
      return;
    }
    // Si todos los campos están llenos, continuar con el registro del banco
    const banco: Banco2 = {
      nombre: this.nombreB,
      logo: this.logo,
      direccion: this.direccion,
      id_Administrador: this.idClienteRegistrado // Establecer el ID del cliente
    };

    this._bancosService.postBancos(banco).subscribe({
      next: (v: any) => {
        this.toastr.success(`El banco ${this.nombreB} fue registrado con éxito`, 'Banco Registrado');
        this.idBancoRegistrado = v.id;
        console.log(banco);

        // Navegar a la página principal
        this.router.navigate(['/principal']);

        // Cerrar el modal
        this.closeModal();
        window.location.reload();
      },
      error: (e: HttpErrorResponse) => {
        this.toastr.error('Error al registrar el banco', 'Error');
      }
    });
  }






}
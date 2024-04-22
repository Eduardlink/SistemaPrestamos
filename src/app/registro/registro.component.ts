import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { Registro } from '../interfaces/registro';
import { ToastrService } from 'ngx-toastr';
import { RegistroService } from '../servicios/registro.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BancoService } from '../servicios/banco.service';
import { Banco } from '../interfaces/banco';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  adminSelected: boolean = false;
  idClienteRegistrado!: number;

  id_Cliente: number = 0;
  usuario: string = '';
  contrasenia: string = '';
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  telefono: string = '';
  rol: string = '';


  id_Banco!: number;
  nombreB!: string;
  logo!: string;
  direccion!: string;
  id_Administrador!: number;

  constructor(private toastr: ToastrService,
    private _registroService: RegistroService,
    private _bancosService: BancoService,
    private router: Router) {

  }

  ngOnInit(): void {
  }


  addRegistro() {

    if (this.rol === 'Admin') {
      const modal = document.getElementById('exampleModalToggle');
      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
        modal.setAttribute('aria-modal', 'true');
      }
    }

    if (this.usuario == '' || this.contrasenia == '' || this.nombre == '' || this.apellido == '' || this.correo == '' || this.telefono == '' || this.rol == '') {
      this.toastr.error('Por favor, complete todos los campos para registrar un usuario', 'Error');
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

    //validar que el correo sea valido
    /* const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!pattern.test(this.correo)) {
      this.toastr.error('El correo no es valido', 'Error');
      return;
    } */
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
    // Verificar que se haya registrado un cliente antes de agregar un banco
    if (this.idClienteRegistrado === 0) {
      this.toastr.error('Por favor, registra un usuario antes de agregar un banco', 'Error');
      return;
    }

    if (this.nombreB == '' || this.logo == '' || this.direccion == '') {
      this.toastr.error('Por favor, complete todos los campos para registrar un banco', 'Error');
      return;
    }

    const banco: Banco = {
      id_Banco: 0, // ¿Cómo se obtiene el ID del banco? Este valor debería ser autogenerado por la base de datos
      nombre: this.nombreB,
      logo: this.logo,
      direccion: this.direccion,
      id_Administrador: this.idClienteRegistrado // Establecer el ID del cliente
    };

    this._bancosService.postBancos(banco).subscribe({
      next: (v) => {
        this.toastr.success(`El banco ${this.nombreB} fue registrado con éxito`, 'Banco Registrado');
        console.log(banco);
          
      },
      error: (e: HttpErrorResponse) => {
        this.toastr.error('Error al registrar el banco', 'Error');
      }
    });
  }




}
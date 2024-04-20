import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Registro } from '../interfaces/registro';
import { ToastrService } from 'ngx-toastr';
import { RegistroService } from '../servicios/registro.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{

  usuario: string = '';
  contrasenia: string = '';
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  telefono: string = '';
  rol: string = '';


  idBanco!: string;
  nombreB!: string;
  logo!: string;
  direccion!: string;
  rolB!: string;
  id_Administrador!: string;

  constructor(private toastr: ToastrService,
    private _registroService: RegistroService) {

  }

  ngOnInit(): void {
  }


  addRegistro() {

    /* if(this.usuario == '' || this.contrasenia == '' || this.nombre == '' || this.apellido == '' || this.correo == '' || this.telefono == '' || this.rol == ''){
      this.toastr.error('Por favor, complete todos los campos para registrar un usuario', 'Error');
      return;
      } */

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
      next: (v) => {
        this.toastr.success(`El usuario ${this.usuario} fue registrado con exito`, 'Usuario Registrado');

        console.log(registro);
      },
      error: (e: HttpErrorResponse) => {
        this.toastr.error('Error al registrar el usuario', 'Error');
      }
    });


  }





}
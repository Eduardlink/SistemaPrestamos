import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headerprincipal',
  templateUrl: './headerprincipal.component.html',
  styleUrls: ['./headerprincipal.component.css']
})
export class HeaderprincipalComponent {
  @Output() cambiarPantalla = new EventEmitter<string>();

  emitirCambioPantalla(pantalla: string) {
    this.cambiarPantalla.emit(pantalla);
  }
}
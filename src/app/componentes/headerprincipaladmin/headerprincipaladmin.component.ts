import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-headerprincipaladmin',
  templateUrl: './headerprincipaladmin.component.html',
  styleUrls: ['./headerprincipaladmin.component.css']
})
export class HeaderprincipaladminComponent {
  @Output() cambiarPantalla = new EventEmitter<string>();

  emitirCambioPantalla(pantalla: string) {
    this.cambiarPantalla.emit(pantalla);
  }
}


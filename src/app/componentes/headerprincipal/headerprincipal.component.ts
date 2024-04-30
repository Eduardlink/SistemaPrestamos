import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-headerprincipal',
  templateUrl: './headerprincipal.component.html',
  styleUrls: ['./headerprincipal.component.css']
})
export class HeaderprincipalComponent {
  @Output() cambiarPantalla = new EventEmitter<string>();

  emitirCambioPagina(pantalla: string) {
    this.cambiarPantalla.emit(pantalla);
  }
}
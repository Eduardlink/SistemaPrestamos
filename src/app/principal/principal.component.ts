import { Component} from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  pantallaActual: string = 'pagos'; // Por defecto, muestra la pantalla de Sistema de Pagos

  cambiarPantalla(pantalla: string) {
    this.pantallaActual = pantalla;
  }
}
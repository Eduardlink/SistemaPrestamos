import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }

  cerrarSesion() {
    // Limpiar el localStorage
    localStorage.removeItem('rolUsuario');
    localStorage.removeItem('idCliente')


    // Redirigir al usuario a la página de inicio de sesión u otra página deseada
    this.router.navigate(['/principal']); // Reemplaza '/login' con la ruta de tu página de inicio de sesión
}
}


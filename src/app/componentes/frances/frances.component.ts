import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-frances',
  templateUrl: './frances.component.html',
  styleUrls: ['./frances.component.css'],
})
export class FrancesComponent {
  tipoPrestamo: string;
  costoVivienda: number;
  montoPrestamo: number;
  plazo: number;
  metodoPagoIntereses: string;
  pagoCapital: number;
  pagoInteres: number;
  pagoSeguro: number;
  duracionMeses: number;
  tasaReferencial: number;
  capitalTotal: number;
  totalInteres: number;
  totalSeguroDesgravamen: number;

  constructor() {
    this.tipoPrestamo = '';
    this.costoVivienda = 0;
    this.montoPrestamo = 0;
    this.plazo = 0;
    this.metodoPagoIntereses = 'frances';
    this.pagoCapital = 0;
    this.pagoInteres = 0;
    this.pagoSeguro = 0;
    this.duracionMeses = 0;
    this.tasaReferencial = 0;
    this.capitalTotal = 0;
    this.totalInteres = 0;
    this.totalSeguroDesgravamen = 0;
    
  }

  simularPrestamo() {
    // Aquí puedes implementar la lógica para simular el préstamo
    console.log('Simulación de préstamo');
    console.log('Tipo de préstamo:', this.tipoPrestamo);
    console.log('Costo de la vivienda:', this.costoVivienda);
    console.log('Monto del préstamo:', this.montoPrestamo);
    console.log('Plazo:', this.plazo);
    console.log('Método de pago de intereses:', this.metodoPagoIntereses);
  }

  showModal: boolean = false;

  // Otros atributos y métodos de tu componente

  openModal() {
      this.showModal = true;
  }

  closeModal() {
      this.showModal = false;
  }
}
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-amortizacion-francesa',
  templateUrl: './amortizacion-francesa.component.html',
  styleUrls: ['./amortizacion-francesa.component.css']
})
export class AmortizacionFrancesaComponent implements OnInit {
  @Input() montoPrestamo: number | undefined;
  @Input() plazoMeses: number | undefined;
  @Input() tasaInteresAnual: number | undefined;

  amortizacionFrancesa: any[] = [];

  constructor() { }

  ngOnInit(): void {
    if (this.montoPrestamo && this.plazoMeses && this.tasaInteresAnual) {
      const tasaMensual = this.tasaInteresAnual / 12;
      const cuota = (this.montoPrestamo * tasaMensual) /
                    (1 - Math.pow(1 + tasaMensual, -this.plazoMeses));
      
      let saldoRestante = this.montoPrestamo;
      for (let i = 1; i <= this.plazoMeses; i++) {
        const interes = saldoRestante * tasaMensual;
        const amortizacion = cuota - interes;
        saldoRestante -= amortizacion;

        this.amortizacionFrancesa.push({
          periodo: i,
          cuota: cuota.toFixed(2),
          interes: interes.toFixed(2),
          amortizacion: amortizacion.toFixed(2),
          saldoRestante: saldoRestante.toFixed(2),
          capital: amortizacion.toFixed(2) // Capital es igual a amortización en este caso
        });
      }
    }
  }
}


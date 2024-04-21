import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-amortizacion-alemana',
  templateUrl: './amortizacion-alemana.component.html',
  styleUrls: ['./amortizacion-alemana.component.css']
})
export class AmortizacionAlemanaComponent implements OnInit {
  @Input() montoPrestamo: number | undefined;
  @Input() plazoMeses: number | undefined;
  @Input() tasaInteresAnual: number | undefined;

  amortizacionAlemana: any[] = [];

  constructor() { }

  ngOnInit(): void {
    if (this.montoPrestamo && this.plazoMeses && this.tasaInteresAnual) {
      const tasaMensual = this.tasaInteresAnual / 12;
      const capital = this.montoPrestamo / this.plazoMeses;

      let saldoRestante = this.montoPrestamo;
      for (let i = 1; i <= this.plazoMeses; i++) {
        const interes = (saldoRestante * tasaMensual);
        const cuota = capital + interes;
        saldoRestante -= capital;

        this.amortizacionAlemana.push({
          periodo: i,
          cuota: cuota.toFixed(2),
          interes: interes.toFixed(2),
          capital: capital.toFixed(2),
          saldoRestante: saldoRestante.toFixed(2)
        });
      }
    }
  }

}

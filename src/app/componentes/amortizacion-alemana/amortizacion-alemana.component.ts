import { Component, Input, OnInit } from '@angular/core';
import { CobrosIndirectosService } from '../../servicios/cobros-indirectos.service';

@Component({
  selector: 'app-amortizacion-alemana',
  templateUrl: './amortizacion-alemana.component.html',
  styleUrls: ['./amortizacion-alemana.component.css']
})
export class AmortizacionAlemanaComponent implements OnInit {
  @Input() montoPrestamo: number | undefined;
  @Input() plazoMeses: number | undefined;
  @Input() tasaInteresAnual: number | undefined;
  @Input() idBancoSeleccionado: number | undefined;

  amortizacionAlemana: any[] = [];
  cobrosIndirectos: any[] = [];
  totalCobrosIndirectos: number = 0; // Variable para almacenar la suma de montos de cobros indirectos

  constructor(private cobrosIndirectosService: CobrosIndirectosService) { }

  ngOnInit(): void {
    if (this.montoPrestamo && this.plazoMeses && this.tasaInteresAnual && this.idBancoSeleccionado) {
      // Llamar al servicio de cobros indirectos con la ID del banco seleccionado
      this.cobrosIndirectosService.getCobrosIndirectosByBancoId(this.idBancoSeleccionado)
        .subscribe(cobros => {
          this.cobrosIndirectos = cobros;
          this.calcularTotalCobrosIndirectos();
          this.calcularAmortizacionAlemana();
        });
    }
  }

  // Función para calcular la suma de montos de cobros indirectos
  calcularTotalCobrosIndirectos(): void {
    if (this.cobrosIndirectos.length > 0) {
      this.totalCobrosIndirectos = this.cobrosIndirectos.reduce((sum, cobro) => sum + parseFloat(cobro.montoSeguro), 0);
    }
  }

  // Función para calcular la tabla de amortización en el sistema alemán
  calcularAmortizacionAlemana(): void {
    if (this.montoPrestamo && this.plazoMeses && this.tasaInteresAnual) {
      const tasaMensual = this.tasaInteresAnual / 12;
      let saldoRestante = this.montoPrestamo;

      for (let i = 1; i <= this.plazoMeses; i++) {
        const interes = saldoRestante * tasaMensual;
        const cuota = saldoRestante / this.plazoMeses + interes;
        saldoRestante -= saldoRestante / this.plazoMeses;

        this.amortizacionAlemana.push({
          periodo: i,
          cuota: cuota.toFixed(2),
          interes: interes.toFixed(2),
          capital: (saldoRestante / this.plazoMeses).toFixed(2),
          saldoRestante: saldoRestante.toFixed(2),
          cobrosIndirectos: this.calcularCobrosIndirectosPorPeriodo(i).toFixed(2),
          sumaCuotaCobrosIndirectos: (cuota + this.calcularCobrosIndirectosPorPeriodo(i)).toFixed(2)
        });
      }
    }
  }

  // Función para calcular los cobros indirectos por período
  calcularCobrosIndirectosPorPeriodo(periodo: number): number {
    if (this.cobrosIndirectos.length > 0 && this.plazoMeses && periodo <= this.plazoMeses) {
      return this.totalCobrosIndirectos / this.plazoMeses;
    }
    return 0;
  }

}

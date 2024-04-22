import { Component, Input, OnInit } from '@angular/core';
import { CobrosIndirectosService } from '../../servicios/cobros-indirectos.service';

@Component({
  selector: 'app-amortizacion-francesa',
  templateUrl: './amortizacion-francesa.component.html',
  styleUrls: ['./amortizacion-francesa.component.css']
})
export class AmortizacionFrancesaComponent implements OnInit {
  @Input() montoPrestamo: number | undefined;
  @Input() plazoMeses: number | undefined;
  @Input() tasaInteresAnual: number | undefined;
  @Input() idBancoSeleccionado: number | undefined;

  amortizacionFrancesa: any[] = [];
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
          this.calcularAmortizacionFrancesa();
        });
    }
  }

  // Función para calcular la suma de montos de cobros indirectos
  calcularTotalCobrosIndirectos(): void {
    if (this.cobrosIndirectos.length > 0) {
      this.totalCobrosIndirectos = this.cobrosIndirectos.reduce((sum, cobro) => sum + parseFloat(cobro.montoSeguro), 0);
    }
  }

  // Función para calcular la tabla de amortización en el sistema francés
  calcularAmortizacionFrancesa(): void {
    if (this.montoPrestamo && this.plazoMeses && this.tasaInteresAnual) {
      const tasaMensual = this.tasaInteresAnual / 12;
      const cuota = this.calcularCuota(this.montoPrestamo, this.plazoMeses, tasaMensual);
      let saldoRestante = this.montoPrestamo;

      for (let i = 1; i <= this.plazoMeses && saldoRestante !== undefined; i++) {
        const interes = saldoRestante * tasaMensual;
        const amortizacion = cuota - interes;
        saldoRestante -= amortizacion;

        this.amortizacionFrancesa.push({
          periodo: i,
          cuota: cuota.toFixed(2),
          interes: interes.toFixed(2),
          amortizacion: amortizacion.toFixed(2),
          capital: saldoRestante.toFixed(2),
          saldoRestante: saldoRestante.toFixed(2),
          cobrosIndirectos: this.calcularCobrosIndirectosPorPeriodo(i).toFixed(2),
          sumaCuotaCobrosIndirectos: (cuota + this.calcularCobrosIndirectosPorPeriodo(i)).toFixed(2)
        });
      }
    }
  }

  // Función para calcular la cuota mensual en el sistema francés
  calcularCuota(monto: number, plazo: number, tasaMensual: number): number {
    const factor = Math.pow(1 + tasaMensual, plazo);
    return monto * (tasaMensual * factor) / (factor - 1);
  }

  // Función para calcular los cobros indirectos por período
  calcularCobrosIndirectosPorPeriodo(periodo: number): number {
    if (this.cobrosIndirectos.length > 0 && this.plazoMeses && periodo <= this.plazoMeses) {
      return this.totalCobrosIndirectos / this.plazoMeses;
    }
    return 0;
  }

}

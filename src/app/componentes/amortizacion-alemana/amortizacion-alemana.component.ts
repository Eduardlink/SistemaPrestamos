import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CobrosIndirectosService } from '../../servicios/cobros-indirectos.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-amortizacion-alemana',
  templateUrl: './amortizacion-alemana.component.html',
  styleUrls: ['./amortizacion-alemana.component.css'],
})
export class AmortizacionAlemanaComponent implements OnInit {
  @Input() montoPrestamo: number | undefined;
  @Input() plazoMeses: number | undefined;
  @Input() tasaInteresAnual: number | undefined;
  @Input() idBancoSeleccionado: number | undefined;

  amortizacionAlemana: any[] = [];
  cobrosIndirectos: any[] = [];
  totalCobrosIndirectos: number = 0; // Variable para almacenar la suma de montos de cobros indirectos

  @ViewChild('cobrosIndirectosSection') cobrosIndirectosSection!: ElementRef;
  @ViewChild('amortizacionTable') amortizacionTable!: ElementRef;

  constructor(private cobrosIndirectosService: CobrosIndirectosService) {}

  ngOnInit(): void {
    if (
      this.montoPrestamo &&
      this.plazoMeses &&
      this.tasaInteresAnual &&
      this.idBancoSeleccionado
    ) {
      // Llamar al servicio de cobros indirectos con la ID del banco seleccionado
      this.cobrosIndirectosService
        .getCobrosIndirectosByBancoId(this.idBancoSeleccionado)
        .subscribe((cobros) => {
          this.cobrosIndirectos = cobros;
          this.calcularTotalCobrosIndirectos();
          this.calcularAmortizacionAlemana();
        });
    }
  }

  // Función para calcular la suma de montos de cobros indirectos
  calcularTotalCobrosIndirectos(): void {
    if (this.cobrosIndirectos.length > 0) {
      this.totalCobrosIndirectos = this.cobrosIndirectos.reduce(
        (sum, cobro) => sum + parseFloat(cobro.montoSeguro),
        0
      );
    }
  }

  // Función para calcular la tabla de amortización en el sistema alemán
  calcularAmortizacionAlemana(): void {
    if (this.montoPrestamo && this.plazoMeses && this.tasaInteresAnual) {
      const tasaMensual = this.tasaInteresAnual / 12;
      let saldoRestante = this.montoPrestamo;

      for (let i = 1; i <= this.plazoMeses; i++) {
        const interes = saldoRestante * tasaMensual;
        const amortizacion = this.montoPrestamo / this.plazoMeses;
        const cuota = amortizacion + interes;

        saldoRestante -= amortizacion;

        this.amortizacionAlemana.push({
          periodo: i,
          cuota: cuota.toFixed(2),
          interes: interes.toFixed(2),
          amortizacion: amortizacion.toFixed(2),
          capital: saldoRestante.toFixed(2),
          saldoRestante: saldoRestante.toFixed(2),
          cobrosIndirectos:
            this.calcularCobrosIndirectosPorPeriodo(i).toFixed(2),
          sumaCuotaCobrosIndirectos: (
            cuota + this.calcularCobrosIndirectosPorPeriodo(i)
          ).toFixed(2),
        });

        if (saldoRestante <= 0) {
          break;
        }
      }
    }
  }

  // Función para calcular los cobros indirectos por período
  calcularCobrosIndirectosPorPeriodo(periodo: number): number {
    if (
      this.cobrosIndirectos.length > 0 &&
      this.plazoMeses &&
      periodo <= this.plazoMeses
    ) {
      return this.totalCobrosIndirectos / this.plazoMeses;
    }
    return 0;
  }

  // Método para generar el archivo PDF desde la tabla HTML
  generarPDF(): void {
    const doc = new jsPDF();

    // Capturar secciones HTML como imágenes
    html2canvas(this.cobrosIndirectosSection.nativeElement).then((canvas1) => {
      const imgData1 = canvas1.toDataURL('image/png');

      html2canvas(this.amortizacionTable.nativeElement).then((canvas2) => {
        const imgData2 = canvas2.toDataURL('image/png');

        // Agregar imágenes al documento PDF
        const imgWidth = doc.internal.pageSize.getWidth(); // Ancho de página
        const imgHeight = doc.internal.pageSize.getHeight(); // Alto de página

        doc.addImage(imgData1, 'PNG', 10, 10, imgWidth - 20, imgHeight / 10);
        doc.addImage(imgData2, 'PNG', 10, 50, imgWidth - 20, imgHeight / 3);

        // Descargar el PDF
        doc.save('amortizacion_alemana.pdf');
      });
    });
  }
}

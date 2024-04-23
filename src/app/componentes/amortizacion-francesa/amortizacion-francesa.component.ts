import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CobrosIndirectosService } from '../../servicios/cobros-indirectos.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-amortizacion-francesa',
  templateUrl: './amortizacion-francesa.component.html',
  styleUrls: ['./amortizacion-francesa.component.css']
})
export class AmortizacionFrancesaComponent implements OnInit {
  @Input() tipoAmortizacion: string | undefined;
  @Input() montoPrestamo: number | undefined;
  @Input() plazoMeses: number | undefined;
  @Input() tasaInteresAnual: number | undefined;
  @Input() idBancoSeleccionado: number | undefined;
  @Input() nombreBanco: string | undefined;
  @Input() direccionBanco: string | undefined;
  @Input() logoBanco: string | undefined;
  @Input() tipoCredito: string | undefined;

  amortizacionFrancesa: any[] = [];
  cobrosIndirectos: any[] = [];
  totalCobrosIndirectos: number = 0; // Variable para almacenar la suma de montos de cobros indirectos

  @ViewChild('cobrosIndirectosSection') cobrosIndirectosSection!: ElementRef;
  @ViewChild('amortizacionTable') amortizacionTable!: ElementRef;

  constructor(private cobrosIndirectosService: CobrosIndirectosService) {}

  ngOnInit(): void {
    if (this.montoPrestamo && this.plazoMeses && this.tasaInteresAnual && this.idBancoSeleccionado) {
      this.cobrosIndirectosService
        .getCobrosIndirectosByBancoId(this.idBancoSeleccionado)
        .subscribe((cobros) => {
          this.cobrosIndirectos = cobros;
          this.calcularTotalCobrosIndirectos();
          this.calcularAmortizacionFrancesa();
        });
    }
  }

  receiveData(data: any): void {
    this.montoPrestamo = data.montoPrestamo;
    this.plazoMeses = data.plazoMeses;
    this.tasaInteresAnual = data.tasaInteresAnual;
    this.tipoAmortizacion = data.tipoAmortizacion;
    this.nombreBanco = data.nombreBanco;
    this.logoBanco = data.logoBanco;
    this.direccionBanco = data.direccionBanco;
    this.tipoCredito = data.tipoPrestamo;
    this.cobrosIndirectos = data.cobrosIndirectos;
  
    this.calcularAmortizacionFrancesa();
  }

  receiveCobrosIndirectos(cobrosIndirectos: any[]): void {
    // Recibir y mostrar los cobros indirectos
    this.cobrosIndirectos = cobrosIndirectos;
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
  calcularAmortizacionFrancesa(): void {
    this.amortizacionFrancesa = []; // Limpiar el array antes de calcular nuevamente
  
    if (this.montoPrestamo && this.plazoMeses && this.tasaInteresAnual) {
      const tasaMensual = this.tasaInteresAnual / 12;
      let saldoRestante = this.montoPrestamo;
  
      for (let i = 1; i <= this.plazoMeses; i++) {
        const interes = saldoRestante * tasaMensual;
        const cuota = this.calcularCuotaFrancesa(this.montoPrestamo, this.plazoMeses, tasaMensual);
        const amortizacion = cuota - interes;
  
        this.amortizacionFrancesa.push({
          periodo: i,
          cuota: cuota.toFixed(2),
          interes: interes.toFixed(2),
          amortizacion: amortizacion.toFixed(2),
          capital: saldoRestante.toFixed(2),
          saldoRestante: (saldoRestante - amortizacion).toFixed(2),
          cobrosIndirectos: this.calcularCobrosIndirectosPorPeriodo().toFixed(2),
          sumaCuotaCobrosIndirectos: (cuota + this.calcularCobrosIndirectosPorPeriodo()).toFixed(2)
        });
  
        saldoRestante -= amortizacion;
  
        if (saldoRestante <= 0) {
          break;
        }
      }
    }
  }
  

  calcularCuotaFrancesa(monto: number, plazo: number, tasaMensual: number): number {
    return monto * (tasaMensual / (1 - Math.pow(1 + tasaMensual, -plazo)));
  }
  
  // Función para calcular la suma total de los cobros indirectos y dividir entre plazo en meses
  calcularCobrosIndirectosPorPeriodo(): number {
    let sumaCobrosIndirectos = this.cobrosIndirectos.reduce(
      (sum, cobro) => sum + parseFloat(cobro.montoSeguro),
      0
    );

    if (this.plazoMeses !== undefined && this.plazoMeses !== 0) {
      return sumaCobrosIndirectos / this.plazoMeses;
    } else {
      return 0;
    }
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
        doc.save('amortizacion_francesa.pdf');
      });
    });
  }
}

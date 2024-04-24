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
  @Input() tipoAmortizacion: string | undefined;
  @Input() montoPrestamo: number | undefined;
  @Input() plazoMeses: number | undefined;
  @Input() tasaInteresAnual: number | undefined;
  @Input() idBancoSeleccionado: number | undefined;
  @Input() nombreBanco: string | undefined;
  @Input() direccionBanco: string | undefined;
  @Input() logoBanco: string | undefined;
  @Input() tipoCredito: string | undefined;

  amortizacionAlemana: any[] = [];
  cobrosIndirectos: any[] = [];
  totalCobrosIndirectos: number = 0; // Variable para almacenar la suma de montos de cobros indirectos

  @ViewChild('cobrosIndirectosSection') cobrosIndirectosSection!: ElementRef;
  @ViewChild('amortizacionTable') amortizacionTable!: ElementRef;
  @ViewChild('htmlData') htmlData!: ElementRef;

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

  receiveData(data: any): void {
    // Handle received data from the parent component
    this.montoPrestamo = data.montoPrestamo;
    this.plazoMeses = data.plazoMeses;
    this.tasaInteresAnual = data.tasaInteresAnual;
    this.tipoAmortizacion = data.tipoAmortizacion;
    this.nombreBanco = data.nombreBanco;
    this.logoBanco = data.logoBanco;
    this.direccionBanco = data.direccionBanco;
    this.tipoCredito = data.tipoPrestamo;
    this.cobrosIndirectos = data.cobrosIndirectos;

    // Call method to recalculate amortization based on new data
    this.calcularAmortizacionAlemana();
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

  formatTasaInteres(): string {
    if (this.tasaInteresAnual !== undefined) {
      return (this.tasaInteresAnual * 100).toFixed(2); // Multiplicar por 100 para mostrar como porcentaje y fijar 2 decimales
    }
    return ''; // Manejo de caso undefined o null
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
        const cobrosIndirectosPorPeriodo =
          this.calcularCobrosIndirectosPorPeriodo();

        saldoRestante -= amortizacion;

        this.amortizacionAlemana.push({
          periodo: i,
          cuota: cuota.toFixed(2),
          interes: interes.toFixed(2),
          amortizacion: amortizacion.toFixed(2),
          capital: saldoRestante.toFixed(2),
          saldoRestante: saldoRestante.toFixed(2),
          cobrosIndirectos: cobrosIndirectosPorPeriodo.toFixed(2),
          sumaCuotaCobrosIndirectos: (
            cuota + cobrosIndirectosPorPeriodo
          ).toFixed(2),
        });

        if (saldoRestante <= 0) {
          break;
        }
      }
    }
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
    if (this.htmlData && this.htmlData.nativeElement) {
      const DATA: any = this.htmlData.nativeElement;
  
      // Crear un nuevo documento PDF con opciones
      const doc = new jsPDF('p', 'pt', 'a4');
  
      // Definir las opciones de renderizado HTML
      const options = {
        background: 'white',
        scale: 1
      };
  
      // Agregar el contenido HTML al documento PDF con las opciones
      doc.html(DATA, {
        ...options,
        callback: (pdf) => {
          if (pdf) {
            doc.save('amortizacion.pdf');
          } else {
            console.error('Error al generar el PDF.');
          }
        },
        x: 10,
        y: 10,
      });
    } else {
      console.error('Elemento htmlData no está disponible.');
    }
  }
}

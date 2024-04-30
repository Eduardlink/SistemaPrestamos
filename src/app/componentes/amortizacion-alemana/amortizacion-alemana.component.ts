import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CobrosIndirectosService } from '../../servicios/cobros-indirectos.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}
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
  tablaAmortizacionData: any[] = [];

  

  @ViewChild('cobrosIndirectosSection') cobrosIndirectosSection!: ElementRef;
  @ViewChild('encabezadoDocumento') encabezadoDocumento!: ElementRef;
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
    this.amortizacionAlemana = [];
    if (this.montoPrestamo && this.plazoMeses && this.tasaInteresAnual) {
      const tasaMensual = this.tasaInteresAnual / 12;
      let saldoRestante = this.montoPrestamo;
      const amortizacionData: any[] = [];

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

        amortizacionData.push([
          i,
          cuota.toFixed(2),
          interes.toFixed(2),
          amortizacion.toFixed(2),
          saldoRestante.toFixed(2),
          saldoRestante.toFixed(2),
          cobrosIndirectosPorPeriodo.toFixed(2),
          (cuota + cobrosIndirectosPorPeriodo).toFixed(2),
        ]);

        if (saldoRestante <= 0) {
          break;
        }
      }
      // Asignar los datos de la tabla a la variable del componente
      this.tablaAmortizacionData = amortizacionData;
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
    const doc = new jsPDF('p', 'pt', 'a4') as jsPDFWithPlugin;

    //agrega aqui un elemento usando html2canvas
  
    doc.setFontSize(22);
    doc.text(this.nombreBanco+"", 40, 50);
    doc.setFontSize(18);
    doc.text("Detalles del crédito", 40, 100);
    let interes = this.formatTasaInteres();

    doc.setFontSize(12);
    doc.text("Tipo de crédito: " + this.tipoCredito, 40, 120);
    doc.text("Monto: " + this.montoPrestamo, 40, 135);
    doc.text("Interes Anual: " + interes +"%", 40, 150);
    doc.text("Tipo de Amortización: " + this.montoPrestamo, 40, 165);
    doc.text("Dirección del banco: " + this.direccionBanco, 40, 180);
    
    doc.setFontSize(14);
    doc.text("Cobros Indirectos", 40, 215);
    
    doc.setFontSize(12)
    let posicionTexto = 220;
    for (let cobro of this.cobrosIndirectos){
      posicionTexto += 15;
      doc.text("Cobro Indirecto: " + cobro.nombreCobroIndirecto + ": "+ cobro.montoSeguro, 40, posicionTexto);
    }
    
    posicionTexto = posicionTexto + 20;
    // Generar la tabla
    doc.autoTable({
      head: [['Periodo', 'Cuota', 'Interés', 'Amortización', 'Capital', 'Saldo Restante', 'Cobros Indirectos', 'Cuota + Cobros Indirectos']],
      body: this.tablaAmortizacionData,
      startY: posicionTexto // Establecer la posición Y de inicio de la tabla
    });
  
    doc.save('amortizacionAlemana.pdf');
  }
  

  
  
}

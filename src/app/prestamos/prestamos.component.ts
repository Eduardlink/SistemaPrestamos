import { Component, OnInit } from '@angular/core';
import { BancoService } from '../servicios/banco.service';
import { PrestamoService } from '../servicios/prestamo.service';
import { Banco } from '../interfaces/banco';
import { Prestamo } from '../interfaces/prestamo';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  bancos: Banco[] = [];
  selectedBancoId: number | undefined;
  prestamos: Prestamo[] = [];
  selectedPrestamoId: number | undefined;

  montoSolicitado: number | undefined;
  plazoMeses: number | undefined;
  interesAnual: number | undefined;
  tipoAmortizacion: string | undefined;

  constructor(
    private bancoService: BancoService,
    private prestamoService: PrestamoService
  ) {}

  ngOnInit() {
    this.getBancos();
  }

  getBancos(): void {
    this.bancoService.getBancos()
      .subscribe(bancos => {
        this.bancos = bancos;
      });
  }

  onBancoSelect(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedBancoId = selectedValue ? parseInt(selectedValue, 10) : undefined;
    this.getPrestamosByBancoId();
  }

  getPrestamosByBancoId(): void {
    if (this.selectedBancoId) {
      this.prestamoService.getPrestamosByBancoId(this.selectedBancoId)
        .subscribe(prestamos => {
          this.prestamos = prestamos;
          // Al seleccionar un banco, establecemos el interés anual del primer préstamo como valor predeterminado
          if (this.prestamos.length > 0) {
            this.interesAnual = parseFloat(this.prestamos[0].tasa_interes);
          }
        });
    }
  }

  selectedBancoLogoUrl(): string | undefined {
    const selectedBanco = this.bancos.find(banco => banco.id_Banco === this.selectedBancoId);
    return selectedBanco ? selectedBanco.logo : undefined;
  }

  onPrestamoSelect(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedPrestamoId = selectedValue ? parseInt(selectedValue, 10) : undefined;
  }

  onTipoAmortizacionSelect(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.tipoAmortizacion = selectedValue;
  }

  submitForm(): void {
    // Aquí puedes implementar la lógica para enviar el formulario y procesar la solicitud del préstamo
    console.log('Monto del préstamo:', this.montoSolicitado);
    console.log('Plazo en meses:', this.plazoMeses);
    console.log('Interés anual:', this.interesAnual);
    console.log('Tipo de amortización:', this.tipoAmortizacion);
    // También puedes enviar estos datos al servicio correspondiente para realizar la solicitud de préstamo
  }
}

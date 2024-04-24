import { Component, OnInit, ViewChild } from '@angular/core';
import { BancoService } from '../servicios/banco.service';
import { PrestamoService } from '../servicios/prestamo.service';
import { Banco } from '../interfaces/banco';
import { Prestamo } from '../interfaces/prestamo';
import { AmortizacionAlemanaComponent } from '../componentes/amortizacion-alemana/amortizacion-alemana.component';
import { CobrosIndirectosService } from '../servicios/cobros-indirectos.service';
import { AmortizacionFrancesaComponent } from '../componentes/amortizacion-francesa/amortizacion-francesa.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  @ViewChild(AmortizacionAlemanaComponent) amortizacionAlemanaComponent: AmortizacionAlemanaComponent | undefined;
  @ViewChild(AmortizacionFrancesaComponent) amortizacionFrancesaComponent: AmortizacionFrancesaComponent | undefined;
  bancos: Banco[] = [];
  selectedBancoId: number | undefined;
  prestamos: Prestamo[] = [];
  selectedPrestamoId: number | undefined;

  montoSolicitado: number | undefined;
  plazoMeses: number | undefined;
  interesAnual: number | undefined;
  interesAnualPorcentaje: number | undefined;
  tipoAmortizacion: string | undefined;
  idTipoPrestamo: string | undefined;
  tipoPrestamo: string | undefined;

  cobrosIndirectos: any[] = [];

  constructor(
    private bancoService: BancoService,
    private prestamoService: PrestamoService,
    private cobrosIndirectosService: CobrosIndirectosService,
    private toastr: ToastrService,
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
    this.getPrestamosByBancoId();  // Llamar a getPrestamosByBancoId() al seleccionar un banco
  }
  

  getPrestamosByBancoId(): void {
    if (this.selectedBancoId !== undefined) {
      this.prestamoService.getPrestamosByBancoId(this.selectedBancoId)
        .subscribe(prestamos => {
          this.prestamos = prestamos;
  
          // Obtener los cobros indirectos del servicio
          this.cobrosIndirectosService?.getCobrosIndirectosByBancoId(this.selectedBancoId!)
            .subscribe(cobrosIndirectos => {
              // Asignar los cobros indirectos a la propiedad cobrosIndirectos
              this.cobrosIndirectos = cobrosIndirectos;
  
              // Llamar al método submitForm() después de recibir los cobros indirectos
              this.submitForm();
            });
  
          // Establecer el interés anual del primer préstamo como valor predeterminado
          if (this.prestamos.length > 0) {
            this.interesAnual = parseFloat(this.prestamos[0].tasa_interes);
            this.interesAnualPorcentaje = this.interesAnual * 100;
            this.interesAnualPorcentaje = parseFloat(this.interesAnualPorcentaje.toFixed(2));
          }
        });
    } else {
      console.log('No se ha seleccionado ningún banco.');
    }
  }
  
  
  

  selectedBancoLogoUrl(): string | undefined {
    const selectedBanco = this.bancos.find(banco => banco.id_Banco === this.selectedBancoId);
    return selectedBanco ? selectedBanco.logo : undefined;
  }

  selectedBancoName(): string | undefined {
    const selectedBanco = this.bancos.find(banco => banco.id_Banco === this.selectedBancoId);
    return selectedBanco ? selectedBanco.nombre : undefined;
  }

  selectedBancoAdress(): string | undefined {
    const selectedBanco = this.bancos.find(banco => banco.id_Banco === this.selectedBancoId);
    return selectedBanco ? selectedBanco.direccion : undefined;
  }


  onPrestamoSelect(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedPrestamoId = selectedValue ? parseInt(selectedValue, 10) : undefined;
  
    if (this.selectedPrestamoId) {
      this.prestamoService.getPrestamosByPrestamoId(this.selectedPrestamoId)
        .subscribe(prestamos => {
          if (prestamos.length > 0) {
            const primerPrestamo = prestamos[0];
            this.interesAnual = parseFloat(primerPrestamo.tasa_interes);
            this.tipoPrestamo = primerPrestamo.tipo;
            this.interesAnualPorcentaje = this.interesAnual * 100;
            this.interesAnualPorcentaje = parseFloat(this.interesAnualPorcentaje.toFixed(2));
          }
        });
    }
  }
  

  onTipoAmortizacionSelect(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.tipoAmortizacion = selectedValue;
  }

  submitForm(): void {
    if (this.tipoAmortizacion === 'alemana' && this.amortizacionAlemanaComponent) {
      this.amortizacionAlemanaComponent.receiveData({
        montoPrestamo: this.montoSolicitado,
        plazoMeses: this.plazoMeses,
        tasaInteresAnual: this.interesAnual,
        tipoAmortizacion: this.tipoAmortizacion,
        tipoPrestamo: this.tipoPrestamo,
        nombreBanco: this.selectedBancoName(),
        logoBanco: this.selectedBancoLogoUrl(),
        direccionBanco: this.selectedBancoAdress(),
        cobrosIndirectos: this.cobrosIndirectos
      });
    } else if (this.tipoAmortizacion === 'francesa' && this.amortizacionFrancesaComponent) {
      this.amortizacionFrancesaComponent.receiveData({
        montoPrestamo: this.montoSolicitado,
        plazoMeses: this.plazoMeses,
        tasaInteresAnual: this.interesAnual,
        tipoAmortizacion: this.tipoAmortizacion,
        nombreBanco: this.selectedBancoName(),
        logoBanco: this.selectedBancoLogoUrl(),
        direccionBanco: this.selectedBancoAdress(),
        cobrosIndirectos: this.cobrosIndirectos
      });
    }
  }

  onCalcularClick() {
    this.toastr.error('Complete todos los campos.', 'Error', {
      timeOut: 3000, 
      progressBar: true,
      positionClass: 'toast-top-right'
    });
  }
}

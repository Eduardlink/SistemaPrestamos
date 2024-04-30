import { Component, OnInit } from '@angular/core';
import { BancoService } from '../servicios/banco.service';
import { InversionService } from '../servicios/inversion.service';
import { Banco } from '../interfaces/banco';
import { Inversion } from '../interfaces/inversion';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inversiones',
  templateUrl: './inversiones.component.html',
  styleUrls: ['./inversiones.component.css']
})
export class InversionesComponent implements OnInit {
  bancos: Banco[] = [];
  montoInvertir: number | undefined;
  tipoPlazo: string | undefined;
  cantidadPlazos: number | undefined;
  selectedBancoId: number | undefined;
  valorFinal: number | undefined;
  tasaInteres: number | undefined; // Declarar tasaInteres como propiedad
  beneficio: number | undefined;
  porcentajeInversion: number |undefined;

  constructor(
    private bancoService: BancoService,
    private inversionService: InversionService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarBancos();
  }

  cargarBancos(): void {
    this.bancoService.getBancos()
      .subscribe(bancos => {
        this.bancos = bancos;
      });
  }

  submitForm(): void {
    if (this.montoInvertir && this.tipoPlazo && this.cantidadPlazos && this.selectedBancoId) {
      this.inversionService.getInversionByBancoId(this.selectedBancoId)
        .subscribe((inversiones: Inversion[]) => {
          if (inversiones && inversiones.length > 0) {
            switch (this.tipoPlazo) {
              case 'diario':
                this.tasaInteres = inversiones[0].interes_Diario;
                break;
              case 'mensual':
                this.tasaInteres = inversiones[0].interes_Mensual;
                break;
              case 'anual':
                this.tasaInteres = inversiones[0].interes_Anual;
                break;
              default:
                break;
            }
    
            if (this.tasaInteres !== undefined && this.montoInvertir !== undefined && this.cantidadPlazos !== undefined) {
              const base = 1 + this.tasaInteres;
              this.beneficio = this.montoInvertir * this.cantidadPlazos * this.tasaInteres; 
              const valorFinal = this.montoInvertir + this.beneficio;
              this.porcentajeInversion = (this.tasaInteres * 100);

              this.valorFinal = valorFinal;
            } else {
              console.log('Error: Algunas variables no están definidas correctamente.');
            }
          } else {
            console.log('Error: No se encontraron datos de inversión para este banco.');
          }
        });
    } else {
      console.log('Por favor completa todos los campos.');
    }
  }

  toastInversion() {
    if (!this.selectedBancoId || !this.montoInvertir || !this.tipoPlazo || !this.cantidadPlazos) {
      this.toastr.error('Por favor, complete todos los campos.');
    } else {
      this.toastr.success('Datos completos. Realizando inversión...');
      // Aquí puedes continuar con tu lógica de inversión
    }
  }
  
}

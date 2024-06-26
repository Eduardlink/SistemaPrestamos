import { Component } from '@angular/core';
import { BancoService } from '../servicios/banco.service';
import { ToastrService } from 'ngx-toastr';
import { Banco2 } from '../interfaces/banco2';
import { Router } from '@angular/router';
import { PrestamoService } from '../servicios/prestamo.service';
import { Prestamo } from '../interfaces/prestamo';
import { InversionService } from '../servicios/inversion.service';
import { Inversion } from '../interfaces/inversion';
import { HttpErrorResponse } from '@angular/common/http';
import { CobroIndirectos } from '../interfaces/cobros-indirectos';
import { CobrosIndirectosService } from '../servicios/cobros-indirectos.service';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.css']
})
export class BancosComponent {

  nombre: string = '';
  logo: string = '';
  direccion: string = '';
  idCliente: number = 0;
  idBancoo: number = 0;

  id_Prestamo: number = 0;
  tipo: string = '';
  monto_min: string = '';
  monto_max: string = '';
  tasa: string = '';
  detalle: string = '';

  interes_diario: number = 0;
  interes_mensual: number = 0;
  interes_anual: number = 0;


  //Modal Prestamo
  tipoM: string = '';
  tasaM: string = '';
  montoMin: string = '';
  detalleM: string = '';
  montoMax: string = '';
  //Modal Inversiones
  interesD: number = 0;
  interesM: number = 0;
  interesA: number = 0;
  //Modal Cobros
  nombreCobro: string = '';
  montoCobro: string = '';


  constructor(private _bancoService: BancoService,
    private router: Router,
    private toastr: ToastrService,
    private _prestamoService: PrestamoService,
    private _inversionesService: InversionService,
    private _cobroService: CobrosIndirectosService) { }

  ngOnInit(): void {
    this.idCliente = Number(localStorage.getItem('idCliente'));
    this.idBancoo = Number(localStorage.getItem('id_Banco'));

    this._bancoService.getBancoByClienteId(this.idCliente).subscribe(
      (data: Banco2) => {
        this.nombre = data.nombre;
        this.logo = data.logo;
        this.direccion = data.direccion;
      },
      (error) => {
        this.toastr.error('Ocurrió un error al obtener la información del banco', 'Error');
      }
    );

    this._prestamoService.getPrestamoByClienteId(this.idCliente).subscribe(
      (prestamos: Prestamo) => {
        // Asigna los datos obtenidos a las variables correspondientes
        this.id_Prestamo = 0;
        this.tipo = prestamos.tipo;
        this.monto_min = prestamos.monto_min;
        this.monto_max = prestamos.monto_max;
        this.tasa = prestamos.tasa_interes;
        this.detalle = prestamos.detalles;
      },
      (error) => {
        this.toastr.error('Ocurrió un error al obtener la información de préstamos', 'Error');
      }
    );

    this._inversionesService.getInversionByClienteId(this.idCliente).subscribe(
      (data: Inversion) => {
        this.interes_diario = data.interes_Diario;
        this.interes_mensual = data.interes_Mensual;
        this.interes_anual = data.interes_Anual;
      },
      (error) => {
        this.toastr.error('Ocurrió un error al obtener la información de Inversiones', 'Error');
      }
    );



  }

  updateBanco() {
    if (this.nombre == '' || this.logo == '' || this.direccion == '') {
      this.toastr.error('Por favor, complete todos los campos para actualizar la información del banco', 'Error');
      return;
    }

    const banco2: Banco2 = {
      nombre: this.nombre,
      logo: this.logo,
      direccion: this.direccion,
      id_Administrador: this.idCliente
    }

    this._bancoService.updateBanco(this.idCliente, banco2).subscribe(
      (data: any) => {
        this.toastr.success('Información del banco actualizada correctamente', 'Exito');
      },
      (error) => {
        this.toastr.error('Ocurrió un error al actualizar la información del banco', 'Error');
      }
    );

    const prestamo: Prestamo = {
      id_Banco: 0,
      tipo: this.tipo,
      monto_min: this.monto_min,
      monto_max: this.monto_max,
      tasa_interes: this.tasa,
      detalles: this.detalle,
      id_Prestamo: 0
    };

    this._prestamoService.updatePrestamos(this.idCliente, prestamo).subscribe(
      (data: any) => {
        this.toastr.success('Préstamos actualizados correctamente', 'Éxito');
      },
      (error) => {
        this.toastr.error('Ocurrió un error al actualizar los préstamos', 'Error');
      }
    );


    const inversion: Inversion = {
      id_Banco: 0,
      id_Inversion: 0,
      interes_Mensual: this.interes_mensual,
      interes_Anual: this.interes_anual,
      interes_Diario: this.interes_diario,
    };

    this._inversionesService.updateInversion(this.idCliente, inversion).subscribe(
      (data: any) => {
        this.toastr.success('Inversion actualizados correctamente', 'Éxito');
      },
      (error) => {
        this.toastr.error('Ocurrió un error al actualizar los Inversion', 'Error');
      }
    );

  }

  addCobrosIndirectos() {
    // Verificar si el ID del Banco es válido
    if (this.idBancoo === 0) {
      this.toastr.error('No se ha iniciado sesión en un banco válido', 'Error');
      return;
    }

    // Crear el objeto de cobros indirectos con el ID del Banco correcto
    const cobrosIndirectos: CobroIndirectos = {
      id_Banco: this.idBancoo,
      id_CobroIndirectos: 0,
      nombreCobroIndirecto: this.nombreCobro,
      montoSeguro: this.montoCobro
    };

    // Llamar al servicio para registrar el cobro indirecto
    this._cobroService.postCobros(cobrosIndirectos).subscribe({
      next: (v) => {
        this.toastr.success(`El cobro ${this.nombreCobro} fue registrado con éxito`, 'Cobro Registrado');
        console.log(cobrosIndirectos);
      },
      error: (e: HttpErrorResponse) => {
        this.toastr.error('Error al registrar el cobro', 'Error');
      }
    });
  }

  openModalPrestamo() {
    const modal = document.getElementById('exampleModalToggle1');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-modal', 'true');
    }
  }
  closeModalPrestamo() {
    const modal = document.getElementById('exampleModalToggle1');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-modal', 'false');
    }
  }
  openModalInversiones() {
    const modal = document.getElementById('exampleModalToggle2');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-modal', 'true');

    }
  }

  closeModalInversiones() {
    const modal = document.getElementById('exampleModalToggle2');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-modal', 'false');
    }
  }


  openModalCobros() {
    const modal = document.getElementById('exampleModalToggle3');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-modal', 'true');

    }
  }

  closeModalCobros() {
    const modal = document.getElementById('exampleModalToggle3');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-modal', 'false');
    }
  }
}
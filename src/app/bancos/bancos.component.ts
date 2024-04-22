import { Component } from '@angular/core';
import { BancoService } from '../servicios/banco.service';
import { ToastrService } from 'ngx-toastr';
import { Banco } from '../interfaces/banco';
import { Router } from '@angular/router';
import { RegistroService } from '../servicios/registro.service';
import { PrestamoService } from '../servicios/prestamo.service';
import { Prestamo } from '../interfaces/prestamo';

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

  id_Prestamo: number = 0;
  tipo: string = '';
  monto_min: string = '';
  monto_max: string = '';
  tasa: string = '';
  detalle: string = '';


  constructor(private _bancoService: BancoService,
    private router: Router,
    private toastr: ToastrService,
    private _prestamoService: PrestamoService) { }

  ngOnInit(): void {
    this.idCliente = Number(localStorage.getItem('idCliente'));

    this._bancoService.getBancoByClienteId(this.idCliente).subscribe(
      (data: Banco) => {
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



  }

  updateBanco() {
    if (this.nombre == '' || this.logo == '' || this.direccion == '') {
      this.toastr.error('Por favor, complete todos los campos para actualizar la información del banco', 'Error');
      return;
    }

    const banco: Banco = {
      id_Banco: 1,
      nombre: this.nombre,
      logo: this.logo,
      direccion: this.direccion,
      id_Administrador: this.idCliente
    }

    this._bancoService.updateBanco(this.idCliente, banco).subscribe(
      (data: any) => {
        this.toastr.success('Información del banco actualizada correctamente', 'Exito');
      },
      (error) => {
        this.toastr.error('Ocurrió un error al actualizar la información del banco', 'Error');
      }
    );
  }
}
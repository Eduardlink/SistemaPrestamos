import { Component } from '@angular/core';
import { BancoService } from '../servicios/banco.service';
import { ToastrService } from 'ngx-toastr';
import { Banco } from '../interfaces/banco';
import { Router } from '@angular/router';
import { RegistroService } from '../servicios/registro.service';

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

  constructor(private _bancoService: BancoService,
              private router: Router,
              private toastr: ToastrService,
              private _registroService: RegistroService) { }

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
  }
}
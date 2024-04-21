import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banco } from '../interfaces/banco'; // Asegúrate de importar el tipo de datos para Banco
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BancoService {
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getBancos(): Observable<Banco[]> {
    const url = `${this.myAppUrl}bancos`;
    return this.http.get<Banco[]>(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banco } from '../interfaces/banco'; // Asegúrate de importar el tipo de datos para Banco
import { environment } from '../../environments/enviroment';
import { Banco2 } from '../interfaces/banco2';
@Injectable({
  providedIn: 'root'
})
export class BancoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'bancos';
  }

  getBancos(): Observable<Banco[]> {
    const url = `${this.myAppUrl}${this.myApiUrl}`;
    return this.http.get<Banco[]>(url);
  }

  postBancos(user: Banco2): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, user);
  }

  getBancoByClienteId(userId: number): Observable<Banco> {
    const url = `${this.myAppUrl}${this.myApiUrl}/${userId}`;
    return this.http.get<Banco>(url);
  }

  updateBanco(userId: number, banco: Banco2): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${userId}`, banco);
  }
  
}

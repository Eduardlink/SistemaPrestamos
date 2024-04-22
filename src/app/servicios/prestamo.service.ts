import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from '../interfaces/prestamo';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private myAppUrl: string;
  private myApiUrl: string = 'prestamos';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getPrestamos(): Observable<Prestamo[]> {
    const url = `${this.myAppUrl}prestamos`;
    return this.http.get<Prestamo[]>(url);
  }

  getPrestamosByBancoId(idBanco: number): Observable<Prestamo[]> {
    const url = `${this.myAppUrl}prestamos/banco/${idBanco}`;
    return this.http.get<Prestamo[]>(url);
  }

  getPrestamoByClienteId(userId: number): Observable<Prestamo> {
    const url = `${this.myAppUrl}${this.myApiUrl}/${userId}`;
    return this.http.get<Prestamo>(url);
  }

  updatePrestamos(userId: number, banco: Prestamo): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${userId}`, banco);
  }
}

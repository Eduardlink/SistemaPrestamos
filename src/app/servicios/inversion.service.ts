import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Inversion } from '../interfaces/inversion';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class InversionService {
  private apiUrl = 'http://localhost:5000/inversiones';
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'inversiones';
  }

  getInversiones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getInversionByBancoId(idBanco: number): Observable<any[]> {
    const url = `${this.apiUrl}/banco/${idBanco}`;
    return this.http.get<any[]>(url);
  }
  getInversionByClienteId(userId: number): Observable<Inversion> {
    const url = `${this.myAppUrl}${this.myApiUrl}/${userId}`;
    return this.http.get<Inversion>(url);
  }

  updateInversion(userId: number, banco: Inversion): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${userId}`, banco);
  }


}

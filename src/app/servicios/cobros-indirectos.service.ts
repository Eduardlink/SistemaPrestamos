import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CobroIndirectos } from '../interfaces/cobros-indirectos';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CobrosIndirectosService {
  private apiUrl = 'http://localhost:5000/cobrosindirectos';

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'cobrosindirectos';
  }

  getCobrosIndirectos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCobrosIndirectosByBancoId(idBanco: number): Observable<any[]> {
    const url = `${this.apiUrl}/banco/${idBanco}`;
    return this.http.get<any[]>(url);
  }

  postCobros(user: CobroIndirectos): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, user);
  }

}

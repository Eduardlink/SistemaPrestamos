import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CobrosIndirectosService {
  private apiUrl = 'http://localhost:5000/cobrosindirectos';

  constructor(private http: HttpClient) {}

  getCobrosIndirectos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCobrosIndirectosByBancoId(idBanco: number): Observable<any[]> {
    const url = `${this.apiUrl}/banco/${idBanco}`;
    return this.http.get<any[]>(url);
  }
}

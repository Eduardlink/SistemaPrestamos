import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InversionService {
  private apiUrl = 'http://localhost:5000/inversiones';

  constructor(private http: HttpClient) {}

  getInversiones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getInversionByBancoId(idBanco: number): Observable<any[]> {
    const url = `${this.apiUrl}/banco/${idBanco}`;
    return this.http.get<any[]>(url);
  }

  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro } from '../interfaces/registro';
import { environment } from '../../environments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'usuarios';
  }

  getUsuarios(userId: number): Observable<Registro> {
    const url = `${this.myAppUrl}${this.myApiUrl}/${userId}`;
    return this.http.get<Registro>(url);
  }
  
  

  signIn(user: Registro): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, user);
  }

  login(user: Registro): Observable<string> {
    return this.http.post<string>(this.myAppUrl + this.myApiUrl + '/login', user);
  }

  updatePerfil(userId: number, user: Registro): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${userId}`, user);
  }
  
  

}
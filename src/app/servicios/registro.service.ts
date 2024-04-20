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

  signIn(user: Registro): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, user);
  }

}
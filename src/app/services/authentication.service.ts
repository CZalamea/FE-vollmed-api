import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interfaces/iusuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private myAppUrl:string   = environment.endpoint;
  private myApiUrl:string   = 'api/login/';

  constructor(private http: HttpClient) { }

  authentication(usuario: IUsuario): Observable<any>{
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, usuario);
  }
  getAuthHeaders(): HttpHeaders {
    const auth_token = localStorage.getItem('token_value');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
  }
}

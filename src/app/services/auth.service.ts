import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://qbankapi-exa7gtbachcrh5d8.canadacentral-01.azurewebsites.net';

  constructor(private http: HttpClient) {}

  login(user: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/authentication/login`, {
      user,
      password
    });
  }
}

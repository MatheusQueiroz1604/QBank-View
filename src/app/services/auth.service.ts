import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5083';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/authentication/login`, { email, password });
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token); // Ou sessionStorage
  }

  getToken(): string | null {
    return localStorage.getItem('authToken'); // Ou sessionStorage
  }

  clearToken(): void {
    localStorage.removeItem('authToken'); // Ou sessionStorage
  }
}

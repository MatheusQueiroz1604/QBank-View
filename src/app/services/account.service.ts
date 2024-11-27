import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:5083/accounts';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Recupera o token do localStorage
    if (!token) {
      throw new Error('Token de autenticação não encontrado'); // Ou algum tipo de alerta/erro
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getAccounts(): Observable<any> {
    const headers = this.getAuthHeaders();

    return this.http.get(this.apiUrl, { headers });
  }

  addAccount(account: any): Observable<any> {
    const headers = this.getAuthHeaders();

    return this.http.post(this.apiUrl, account, { headers });
  }

  updateAccount(account: any): Observable<any> {
    const headers = this.getAuthHeaders();

    return this.http.put(`${this.apiUrl}/${account.id}`, account, { headers });
  }

  deleteAccount(accountId: number): Observable<any> {
    const headers = this.getAuthHeaders();

    return this.http.delete(`${this.apiUrl}/${accountId}`, { headers });
  }
}

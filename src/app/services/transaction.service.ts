import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:5083/transactions';

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

  getTransactions(): Observable<any> {
    const headers = this.getAuthHeaders();

    return this.http.get(this.apiUrl, { headers });
  }

  addTransaction(transaction: any): Observable<any> {
    const headers = this.getAuthHeaders();

    return this.http.post(this.apiUrl, transaction, { headers });
  }

  updateTransaction(transaction: any): Observable<any> {
    const headers = this.getAuthHeaders();

    return this.http.put(`${this.apiUrl}/${transaction.transactionId}`, transaction, { headers });
  }

  deleteTransaction(transactionId: number): Observable<any> {
    const headers = this.getAuthHeaders();

    return this.http.delete(`${this.apiUrl}/${transactionId}`, { headers });
  }
}

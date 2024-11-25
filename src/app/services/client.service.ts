import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'https://qbankapi-exa7gtbachcrh5d8.canadacentral-01.azurewebsites.net';

  constructor(private http: HttpClient) {}

  getClients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  addClient(client: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, client);
  }

  updateClient(client: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${client.id}`, client);
  }

  deleteClient(clientId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${clientId}`);
  }
}

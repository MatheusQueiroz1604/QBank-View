import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe(
      data => this.clients = data,
      error => console.error('Erro ao carregar clientes:', error)
    );
  }
  updateClient(client: any): void {
    this.clientService.updateClient(client).subscribe(
      updatedClient => {
        console.log('Cliente atualizado com sucesso:', updatedClient);
        const index = this.clients.findIndex(c => c.id === client.id);
        if (index !== -1) {
          this.clients[index] = updatedClient;
        }
      },
      error => console.error('Erro ao atualizar cliente:', error)
    );
  }

  deleteClient(clientId: string): void {
    this.clientService.deleteClient(clientId).subscribe(
      () => {
        console.log('Cliente excluído com sucesso');
        this.clients = this.clients.filter(client => client.id !== clientId);
      },
      error => console.error('Erro ao excluir cliente:', error)
    );
  }
}

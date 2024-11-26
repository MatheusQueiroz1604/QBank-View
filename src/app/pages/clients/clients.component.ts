import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  newUser: any = {
    userId: null,
    name: '',
    email: '',
    password: '',
    cpf: '',
    birthDate: '',
    phone: '',
  };

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

  createUser(): void {
    this.clientService.addClient(this.newUser).subscribe(
      (createdUser) => {
        console.log('Usuário criado com sucesso:', createdUser);
        this.clients.push(createdUser);
        this.newUser = {
          userId: null,
          name: '',
          email: '',
          password: '',
          cpf: '',
          birthDate: '',
          phone: '',
        };
      },
      (error) => console.error('Erro ao criar usuário:', error)
    );
  }

  updateClient(client: any): void {
    console.log('Cliente recebido para atualização:', client); // Para depuração
    // Verificar se client.userId está definido
    if (!client.userId) {
      console.error('ID do cliente não fornecido');
      return;
    }

    this.clientService.updateClient(client).subscribe(
      updatedClient => {
        console.log('Cliente atualizado com sucesso:', updatedClient);
        const index = this.clients.findIndex(c => c.userId === client.userId);  // Usar userId aqui
        if (index !== -1) {
          this.clients[index] = { ...this.clients[index], ...updatedClient };
        }
      },
      error => console.error('Erro ao atualizar cliente:', error)
    );
  }

  deleteClient(clientId: string): void {
    const id = Number(clientId);
    this.clientService.deleteClient(id).subscribe(
      () => {
        console.log('Cliente excluído com sucesso');
        this.clients = this.clients.filter(client => client.userId !== clientId);  // Usar userId aqui
      },
      error => console.error('Erro ao excluir cliente:', error)
    );
  }
  editClientId: number | null = null;

  startEdit(client: any): void {
    this.editClientId = client.userId;
  }

  saveEdit(client: any): void {
    this.updateClient(client);
    this.editClientId = null;
  }

  cancelEdit(): void {
    this.editClientId = null;
  }
}

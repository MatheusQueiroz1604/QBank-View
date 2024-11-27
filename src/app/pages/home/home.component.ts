import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToClients(): void {
    console.log("Navegando para a página de clientes...");
    this.router.navigate(['/clients']);
  }
  navigateToAccounts(): void {
    console.log("Navegando para a página de clientes...");
    this.router.navigate(['/accounts']);
  }
  navigateToTransactions(): void {
    console.log("Navegando para a página de transações...");
    this.router.navigate(['/transactions']);
  }
}

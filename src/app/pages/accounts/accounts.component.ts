import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent implements OnInit {
  editAccountId: number | null = null;
  accounts: any[] = [];
  newAccount = {
    accountId: 0,
    accountNumber: '',
    balance: 0,
    accountType: '',
    openingDate: '',
    clientId: 0
  };

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe(
      data => this.accounts = data,
      error => console.error('Erro ao carregar contas:', error)
    );
  }

  addAccount(): void {
    this.accountService.addAccount(this.newAccount).subscribe(
      () => this.loadAccounts(),
      error => console.error('Erro ao adicionar conta:', error)
    );
  }

  startEditAccount(account: any): void {
    this.editAccountId = account.accountId;
  }

  saveEditAccount(account: any): void {
    this.updateAccount(account);
    this.editAccountId = null;
  }

  cancelEditAccount(): void {
    this.editAccountId = null;
  }

  updateAccount(account: any): void {
    console.log('Conta recebida para atualização:', account);
    if (!account.accountId) {
      console.error('ID da conta não fornecido');
      return;
    }

    this.accountService.updateAccount(account).subscribe(
      updatedAccount => {
        console.log('Conta atualizada com sucesso:', updatedAccount);
        const index = this.accounts.findIndex(a => a.accountId === account.accountId);
        if (index !== -1) {
          this.accounts[index] = { ...this.accounts[index], ...updatedAccount };
        }
      },
      error => console.error('Erro ao atualizar conta:', error)
    );
  }

  deleteAccount(accountId: number): void {
    this.accountService.deleteAccount(accountId).subscribe(
      () => {
        console.log('Conta excluída com sucesso');
        this.accounts = this.accounts.filter(account => account.accountId !== accountId);
      },
      error => console.error('Erro ao excluir conta:', error)
    );
  }
}

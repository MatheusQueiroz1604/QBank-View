import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  editTransactionId: number | null = null;
  transactions: any[] = [];
  newTransaction = {
    transactionId: 0,
    originAccountId: 0,
    destinationAccountId: 0,
    amount: 0,
    transactionType: 0,
    date: ''
  };

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(
      data => (this.transactions = data),
      error => console.error('Erro ao carregar transações:', error)
    );
  }

  addTransaction(): void {
    this.transactionService.addTransaction(this.newTransaction).subscribe(
      (response) => {
        console.log('Transação adicionada com sucesso:', response);
        this.transactions.push(response);
        this.newTransaction = {
          transactionId: 0,
          originAccountId: 0,
          destinationAccountId: 0,
          amount: 0,
          date: '',
          transactionType: 0
        };
      },
      (error) => {
        console.error('Erro ao adicionar transação:', error);
        alert('Ocorreu um erro ao adicionar a transação. Verifique os logs do servidor para mais detalhes.');
      }
    );
  }

  startEditTransaction(transaction: any): void {
    this.editTransactionId = transaction.transactionId;
  }

  saveEditTransaction(transaction: any): void {
    this.updateTransaction(transaction);
    this.editTransactionId = null;
  }

  cancelEditTransaction(): void {
    this.editTransactionId = null;
  }

  updateTransaction(transaction: any): void {
    console.log('Transação recebida para atualização:', transaction);
    if (!transaction.transactionId) {
      console.error('ID da transação não fornecido');
      return;
    }

    this.transactionService.updateTransaction(transaction).subscribe(
      updatedTransaction => {
        console.log('Transação atualizada com sucesso:', updatedTransaction);
        const index = this.transactions.findIndex(t => t.transactionId === transaction.transactionId);
        if (index !== -1) {
          this.transactions[index] = { ...this.transactions[index], ...updatedTransaction };
        }
      },
      error => console.error('Erro ao atualizar transação:', error)
    );
  }

  deleteTransaction(transactionId: number): void {
    this.transactionService.deleteTransaction(transactionId).subscribe(
      () => {
        console.log('Transação excluída com sucesso');
        this.transactions = this.transactions.filter(transaction => transaction.transactionId !== transactionId);
      },
      error => console.error('Erro ao excluir transação:', error)
    );
  }
}

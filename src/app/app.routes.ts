import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'transactions', component: TransactionsComponent },
];

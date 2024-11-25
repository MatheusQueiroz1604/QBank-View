import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/pages/home/home.component';
import { LoginComponent } from './app/pages/login/login.component';
import { ClientsComponent } from './app/pages/clients/clients.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule),
    provideRouter([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'clients', component: ClientsComponent }
    ])
  ]
}).catch(err => console.error(err));

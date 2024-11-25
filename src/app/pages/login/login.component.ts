import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.user, this.password).subscribe(
      response => {
        localStorage.setItem('authToken', response.token);  // Salve o token, se necessário
        this.router.navigate(['/clients']);
      },
      error => console.error('Erro ao logar:', error)
    );
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  iniciarSesion(): void {

    this.error = '';

    this.authService.login(
      this.email,
      this.password
    ).subscribe({

      next: (response) => {

        console.log('Login exitoso:', response);

        this.router.navigate(['/dashboard']);

      },

      error: (error) => {

        console.error(error);

        this.error =
          error.error?.message ||
          'No se pudo iniciar sesión';

      }

    });
  }
}
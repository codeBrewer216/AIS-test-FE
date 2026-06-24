import { Component, inject, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private zone = inject(NgZone);

  form = {
    email: '',
    password: ''
  }
  showPassword = false
  errorMessage = '';
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.authService.login(this.form.email, this.form.password).subscribe({
      next: (res: any) => {
        localStorage.setItem(
          'accessToken',
          res.access_token
        );
        localStorage.setItem(
          'role',
          res.payload.role
        )
        localStorage.setItem(
          'username',
          JSON.stringify(res.payload.username)
        )
        localStorage.setItem(
          'user',
          JSON.stringify(res.payload)
        );
        this.router.navigate(['/']);
      },
      error: (err) => {
        const msg = err && err.error && err.error.message ? err.error.message : (err && err.message ? err.message : 'Login failed');
        this.zone.run(() => {
          this.errorMessage = msg;
        });
        setTimeout(() => {
          this.zone.run(() => {
            this.errorMessage = '';
          });
        }, 5000);
        console.error(err);
      }
    })
  }
}

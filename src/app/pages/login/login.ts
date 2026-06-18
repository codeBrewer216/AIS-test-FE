import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  form = {
    email: '',
    password: ''
  }
  showPassword = false

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
        console.error(err);
      }
    })
  }
}

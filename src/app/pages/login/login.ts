import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

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
  form = {
    email: '',
    password: ''
  }
  showPassword = false

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    console.log(this.form);
  }
}

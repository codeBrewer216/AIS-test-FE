import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user';
import { CommonModule } from '@angular/common';

export function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword
    ? null
    : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  showPassword = { password: false, confirmPassword: false };


  form = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/
      )
    ]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  });

  get password() {
    return this.form.get('password');
  }

  togglePassword() {
    this.showPassword.password = !this.showPassword.password;
  }

  toggleConfirmPassword() {
    this.showPassword.confirmPassword = !this.showPassword.confirmPassword;
  }

  hasUppercase(): boolean {
    return /[A-Z]/.test(this.password?.value ?? '');
  }

  hasLowercase(): boolean {
    return /[a-z]/.test(this.password?.value ?? '');
  }

  hasNumber(): boolean {
    return /\d/.test(this.password?.value ?? '');
  }

  hasSpecial(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.password?.value ?? '');
  }

  hasMinLength(): boolean {
    return (this.password?.value?.length ?? 0) >= 8;
  }

  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { username, email, password } = this.form.getRawValue();
    this.userService.register({
      username: username!,
      email: email!,
      password: password!
    }).subscribe({
      next: (res) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}

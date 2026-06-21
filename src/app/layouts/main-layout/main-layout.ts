import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  private router: Router = inject(Router);
  private authService = inject(AuthService);

  path = this.router.url
  isLogined = this.authService.isLoggedIn()
  role = this.authService.getRole()

  logout() {
    this.authService.logout()
  }
}

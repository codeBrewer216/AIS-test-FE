import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { Booking } from './pages/booking/booking';
import { Ticket } from './pages/ticket/ticket';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Register } from './pages/register/register';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail-comonent';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'admin', component: AdminDashboard },
      { path: 'booking', component: Booking },
      { path: 'ticket', component: Ticket },
      { path: 'ticket/:id', component: TicketDetailComponent }
    ]
  },
  {
    path: 'dashboard',
    // component: ,
    children: [
      { path: 'admin', component: AdminDashboard },
      { path: 'booking', component: Booking },
      { path: 'ticket', component: Ticket }
    ]
  },
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register }
    ]
  }
];

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;

  register(user: { username: string; email: string; password: string }) {
    return this.http.post(this.apiUrl, user);
  }
}
// curl -X 'POST' \
//   'http://localhost:8000/users' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "username": "johndoe3",
//   "email": "johndoe3@example.com",
//   "password": "P@ssw0rd123"
// }'
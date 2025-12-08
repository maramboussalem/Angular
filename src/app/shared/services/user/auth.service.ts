import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlBackend = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(this.urlBackend).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        return user ? user : null;
      })
    );
  }
 /*
 login(email: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.urlBackend}/login`, { email, password });
}*/


  saveSession(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }
}

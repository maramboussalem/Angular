import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private backendUrl = "http://localhost:8089/api/auth/login";
    private passwordUrl = "http://localhost:8089/api/password";


  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.backendUrl, credentials)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          localStorage.setItem('firstName', res.firstName); // ajouter prénom
          localStorage.setItem('lastName', res.lastName);   // ajouter nom
          localStorage.setItem('userId', res.id); // <-- stocker l'ID utilisateur

        })
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  
  }

  getUserId(): number {
  const id = localStorage.getItem('userId');
  return id ? Number(id) : 0; // Retourne 0 si non défini
}

forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.passwordUrl}/forgot`, { email });
}

resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.passwordUrl}/reset`, { token, newPassword });
}

}

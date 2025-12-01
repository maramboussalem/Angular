import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBackend = 'http://localhost:8089/api/users';

  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.urlBackend}`, user);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlBackend}`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.urlBackend}/${id}`);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.urlBackend}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.urlBackend}/${id}`);
  }
}

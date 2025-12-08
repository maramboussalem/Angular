import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  urlBackend = 'http://localhost:3000/users/'; 

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<User[]>(this.urlBackend);
  }

  getUserById(id: number) {
    return this.http.get<User>(this.urlBackend + id);
  }

  registerUser(u: User) {
    return this.http.post<User>(this.urlBackend, u);
  }

  deleteUser(id: number) {
    return this.http.delete(this.urlBackend + id);
  }

  updateUser(id: number, u: User) {
    return this.http.put<User>(this.urlBackend + id, u);
  }
}

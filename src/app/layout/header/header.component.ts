import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.firstName = localStorage.getItem('firstName') || '';
      this.lastName = localStorage.getItem('lastName') || '';
    }
  }

  logout() {
    this.authService.logout();
    window.location.href = '/users/login'; // rediriger vers login après logout
  }
}

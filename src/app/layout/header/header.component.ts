import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/user/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout() {
  this.authService.logout();
  this.currentUser = null;   // <-- ajoute cette ligne pour mettre à jour la vue
  this.router.navigate(['/users/login']);
}

}

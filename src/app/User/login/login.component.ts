import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  constructor(private router: Router) {}

  ngAfterViewInit() {
    // On attend que la vue soit chargée pour accéder au formulaire
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();  // Empêche le rechargement de la page
        this.router.navigate(['/accueil']); // Redirige vers /accueil
      });
    }
  }
}
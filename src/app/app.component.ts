import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
   title = 'Mon Application';
  showSidebar = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Si on est sur la page login, on cache la sidebar
        this.showSidebar = !(event.url === '/login' || event.url === '/inscription');
      }
    });
  }
}

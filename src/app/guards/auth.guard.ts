import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // utilisateur connecté, accès autorisé
  } else {
    alert('Vous devez vous connecter pour accéder à cette page !');
    router.navigate(['/users/login']); // redirection vers login
    return false; // accès refusé
  }
};

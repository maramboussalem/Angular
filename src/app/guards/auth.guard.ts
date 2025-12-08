// auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../shared/services/user/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getCurrentUser();
  if (user) {
    return true;
  }

  // pas connecté : redirection vers /login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

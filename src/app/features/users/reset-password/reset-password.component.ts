import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  token: string = '';
  newPassword: string = '';
  message = '';
  error = '';

  constructor(private authService: AuthService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    });
  }

  resetPassword() {
    this.message = '';
    this.error = '';

    if (!this.newPassword) {
      this.error = 'Veuillez entrer un nouveau mot de passe';
      return;
    }

    this.authService.resetPassword(this.token, this.newPassword)
      .subscribe({
        next: () => this.message = 'Mot de passe réinitialisé avec succès !',
        error: err => this.error = err.error?.message || 'Erreur lors de la réinitialisation'
      });
  }
}

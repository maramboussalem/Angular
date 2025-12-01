import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email: string = "";
  message = "";
  error = "";

  constructor(private authService: AuthService) {}

  sendResetLink() {
    this.message = "";
    this.error = "";

    if (!this.email) {
      this.error = "Veuillez entrer un email.";
      return;
    }

    this.authService.forgotPassword(this.email)
      .subscribe({
        next: () => this.message = "Un email de réinitialisation vient d’être envoyé !",
        error: (err: HttpErrorResponse) => this.error = err.error?.message || "Email introuvable."
      });
  }
}

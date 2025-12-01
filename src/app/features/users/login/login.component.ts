import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  loginError: string = ''; // un seul message

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    // Réinitialiser le message quand l'utilisateur tape
    this.formLogin.valueChanges.subscribe(() => this.loginError = '');
  }

  login() {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    const data = this.formLogin.value;

    // Reset message
    this.loginError = '';

    this.authService.login(data).subscribe({
      next: () => {
        window.location.href = '/';
      },
      error: (err) => {
        this.loginError = '⚠ Email ou mot de passe incorrect !';
      }
    });
  }
}

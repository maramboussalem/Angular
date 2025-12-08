import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.formLogin = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    const email = this.formLogin.value.email;
    const password = this.formLogin.value.password;

    this.authService.login(email, password).subscribe(user => {
      if (user) {
        alert("Connexion réussie !");
        this.authService.saveSession(user);
        this.router.navigate(['/home']);
      } else {
        alert("Email ou mot de passe incorrect");
      }
    });
  }
}

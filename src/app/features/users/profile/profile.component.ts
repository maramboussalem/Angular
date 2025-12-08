import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/user/auth.service';
import { UsersService } from '../../../shared/services/user/users.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  currentUser: User;

  constructor(
    private authService: AuthService,
   private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      alert('Vous devez être connecté pour voir votre profil');
      this.router.navigate(['/users/login']);
      return;
    }

    this.currentUser = user;

    // Initialiser le formulaire
    this.profileForm = new FormGroup({
      firstName: new FormControl(this.currentUser.firstName, Validators.required),
      lastName: new FormControl(this.currentUser.lastName, Validators.required),
      email: new FormControl({ value: this.currentUser.email, disabled: true }, [Validators.required, Validators.email]),
      password: new FormControl(this.currentUser.password, Validators.required)
    });
  }

  updateProfile() {
    const updatedUser: User = {
      ...this.currentUser,
      ...this.profileForm.getRawValue()
    };

    this.usersService.updateUser(this.currentUser.id, updatedUser).subscribe({
      next: (res) => {
        alert('Profil mis à jour avec succès');
        this.authService.saveSession(res); // mettre à jour session
        this.currentUser = res;
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la mise à jour du profil');
      }
    });
  }

  deleteProfile() {
    if (!confirm('Voulez-vous vraiment supprimer votre compte ?')) return;

    this.usersService.deleteUser(this.currentUser.id).subscribe({
      next: () => {
        alert('Compte supprimé avec succès');
        this.authService.logout();
        this.router.navigate(['/users/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la suppression du compte');
      }
    });
  }

}

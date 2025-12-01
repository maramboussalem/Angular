import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../shared/services/user/user.service';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  formProfile!: FormGroup;
  userId!: number;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
      console.log('UserId:', this.userId); // <-- vérifier la valeur


    this.formProfile = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      address: new FormGroup({
        street: new FormControl(''),
        city: new FormControl('')
      })
    });

    this.loadProfile();
  }

  loadProfile() {
    if (this.userId) {
       if (!this.userId || this.userId <= 0) {
    console.error('UserId invalide, impossible de charger le profil');
    return;
  }
      this.userService.getUserById(this.userId).subscribe(user => {
        // Patch value pour le formulaire
        this.formProfile.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: {
            street: user.address?.street || '',
            city: user.address?.city || ''
          }
        });
      });
    }
  }

  updateProfile() {
    const updatedUser = this.formProfile.value;
    this.userService.updateUser(this.userId, updatedUser).subscribe(() => {
      alert('Profil mis à jour');
      // Mettre à jour le localStorage pour prénom et nom
      localStorage.setItem('firstName', updatedUser.firstName);
      localStorage.setItem('lastName', updatedUser.lastName);
    });
  }

  deleteAccount() {
    if (!confirm('Voulez-vous vraiment supprimer votre compte ?')) return;

    this.userService.deleteUser(this.userId).subscribe(() => {
      this.authService.logout();
      window.location.href = '/users/register';
    });
  }
}

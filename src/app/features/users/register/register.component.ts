import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { UsersService } from '../../../shared/services/user/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  user: User;
  formRegister: FormGroup;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.user = new User();
    this.formRegister = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z]+@[a-z]+\\.[a-z]{2,3}$')
      ]),
      password: new FormControl(''),
      address: new FormGroup({
        street: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zip: new FormControl('')
      }),
      phones: new FormArray([new FormControl('')])
    });
  }

  get phones(): FormArray {
    return this.formRegister.get('phones') as FormArray;
  }

  addPhone() {
    this.phones.push(new FormControl(''));
  }

  save() {
  if (this.formRegister.invalid) {
    this.formRegister.markAllAsTouched();
    return;
  }

  this.user = this.formRegister.getRawValue();

  this.usersService.registerUser(this.user).subscribe({
    next: (res) => {
      console.log("Utilisateur enregistré :", res);
      alert("Compte créé avec succès !");
      this.formRegister.reset();
    },
    error: (err) => {
      console.error("Erreur :", err);
    }
  });
}

}

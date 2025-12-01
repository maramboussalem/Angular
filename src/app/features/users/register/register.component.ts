import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.formRegister = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [
        Validators.required,
Validators.pattern(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-={}\\[\\]|:;"\'<>,.?/~`]).{8,}$'
)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]),
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
    const formValue = this.formRegister.getRawValue();

    const userToSave = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
      address: formValue.address,
      phones: formValue.phones,
      role: 'ROLE_USER'
    };

    this.userService.createUser(userToSave).subscribe({
      next: (res) => {
        console.log('Utilisateur enregistré avec succès', res);
        this.formRegister.reset();
      },
      error: (err) => {
        console.error('Erreur lors de l\'enregistrement', err);
      }
    });
  }
}

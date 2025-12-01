import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  user: User;
  formRegister: FormGroup;
  constructor() {
  }
  ngOnInit() {
    this.user = new User();
    this.formRegister = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),

    })
  }
  save(){
    this.user=this.formRegister.getRawValue();
    console.log(this.user);
    //service to persist the object => save
    //

  }
  //todo 0=> pattern for email => a..z"@"a..z"."a..z & password => 8 char => aA1@
  // todo 1=> work on address: {
  //     street: string;
  //     city: string;
  //     state: string;
  //     zip: string;
  //   }
  //todo 2=> work on the list of phone numbers => dynamic list +1 number
}

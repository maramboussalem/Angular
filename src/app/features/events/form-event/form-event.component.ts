import { Component } from '@angular/core';
import {Eventy} from '../../../models/eventy';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrl: './form-event.component.css'
})
export class FormEventComponent {
  event= new Eventy()
  save(){
    console.log(this.event);
  }
}

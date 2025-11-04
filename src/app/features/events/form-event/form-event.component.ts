import { Component } from '@angular/core';
import { Eventy } from '../../../models/eventy';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrl: './form-event.component.css',
})
export class FormEventComponent {
  today = new Date().toISOString().split('T')[0];
  event: Eventy = new Eventy();
  save() {
    console.log(this.event.title);
  }
}

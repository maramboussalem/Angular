import { Component } from '@angular/core';
import { Eventy } from '../../../models/eventy';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrl: './form-event.component.css',
})
export class FormEventComponent {
  // modèle typé selon Eventy
  model: Eventy = new Eventy();

  // appelée par (ngSubmit)
  onSubmit(): void {
    console.log('Eventy submitted', this.model);
    // TODO: appeler le service pour sauver l'événement et naviguer
  }
}

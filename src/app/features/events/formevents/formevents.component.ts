import { Component } from '@angular/core';

@Component({
  selector: 'app-formevents',
  templateUrl: './formevents.component.html',
  styleUrl: './formevents.component.css'
})
export class FormeventsComponent {
   title: string;


  save(){

  }


  title: string = '';
  description: string = '';
  date: string = '';
  location: string = '';
  price: number | null = null;
  nbPlaces: number | null = null;
  imageUrl: string = '';

  today: string = new Date().toISOString().split('T')[0];

  constructor() {}


  save() {
  console.log('Form data:', {
    title: this.title,
    description: this.description,
    date: this.date,
    location: this.location,
    price: this.price,
    nbPlaces: this.nbPlaces,
    imageUrl: this.imageUrl
  });
  // Call your service here
}

}

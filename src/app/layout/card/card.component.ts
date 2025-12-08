import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {Eventy} from '../../models/eventy';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
 
  @Input() event: Eventy;
  @Input() searchValue: string;

  @Output() eventNotifParent:EventEmitter<Eventy>  = new EventEmitter();   
  @Output() eventDelete: EventEmitter<Eventy> = new EventEmitter();
  @Output() buyTicket: EventEmitter<Eventy> = new EventEmitter();
  @Output() eventDislike: EventEmitter<Eventy> = new EventEmitter();


   notifParent(e: Eventy) {
     this.eventNotifParent.emit(e);
   }

   nbrPlaceDecr(e: Eventy) {
     if (e.nbrPlaces > 0) {
       e.nbrPlaces--;
       this.buyTicket.emit(e); // envoyer au parent
     }
   }

   deleteEvent(e: Eventy) {
     this.eventDelete.emit(e); // émet l'événement vers le parent
   }

  dislike(event: Eventy) {
    if (event.nbrLikes > 0) {
     event.nbrLikes--;
     this.eventDislike.emit(event);
    }
  }

}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Eventy} from '../../../models/eventy';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrl: './card-event.component.css'
})
export class CardEventComponent {
  //data ???
  @Input() event: Eventy;
  @Input() searchValue: string;
  
  @Output() eventNotifParent: EventEmitter<Eventy> = new EventEmitter(); // pour Like
  @Output() eventBuyTicket: EventEmitter<Eventy> = new EventEmitter();   // pour Buy ticket
  @Output() eventDelete: EventEmitter<Eventy> = new EventEmitter();      // delete



  notifParent(e: Eventy) {
   this.eventNotifParent.emit(e); // like
  }

  nbrPlaceDecr(e: Eventy) {
    this.eventBuyTicket.emit(e);   // buy ticket
  }


  deleteEvent(e: Eventy) {
    this.eventDelete.emit(e); // émet l'événement vers le parent
  }
}

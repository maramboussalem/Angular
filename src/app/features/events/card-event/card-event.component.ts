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
  
  @Output() eventNotifParent:EventEmitter<Eventy>  = new EventEmitter();
  @Output() eventDelete: EventEmitter<Eventy> = new EventEmitter();

  notifParent(e: Eventy) {
    this.eventNotifParent.emit(e);
  }

  nbrPlaceDecr(e: Eventy) {
    if (e.nbrPlaces > 0) {
      e.nbrPlaces--;
    }
  }

  deleteEvent(e: Eventy) {
    this.eventDelete.emit(e); // émet l'événement vers le parent
  }
}

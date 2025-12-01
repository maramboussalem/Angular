import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Eventy} from '../../../models/eventy';
import {EventsService} from '../../../shared/data/events.service';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrl: './card-event.component.css'
})
export class CardEventComponent {
  constructor(private eventService: EventsService) {
  }
  searchValue: string;
  @Input() e:Eventy;
  @Output() notificationLike:EventEmitter<Eventy>
    = new EventEmitter();
  nbrPlaceDecr(e:Eventy){
    e.nbPlaces --
    this.eventService.updateEvent(e.id,e).subscribe()
  }
  //Marwa
  nbrLike(e:Eventy){
    e.nbrLike ++
    this.eventService.updateEvent(e.id,e).subscribe()
  }
}

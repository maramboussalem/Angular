import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {EventsService} from "../../shared/data/events.service";
import {Eventy} from "../../models/eventy";
import {RouterModule} from "@angular/router";
@Component({
  selector: 'app-card',
  standalone: true,
    imports: [
        CommonModule, //ngIf+ ngFor
        SharedModule, //directive
        RouterModule, //routerLink
    ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
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

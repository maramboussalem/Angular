import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Eventy } from '../../models/eventy';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,SharedModule,RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() event: Eventy; // <-- remplacer Event par Eventy
  @Input() searchValue: string;

  @Output() eventNotifParent: EventEmitter<Eventy> = new EventEmitter();
  @Output() eventBuyTicket: EventEmitter<Eventy> = new EventEmitter();
  @Output() eventDelete: EventEmitter<Eventy> = new EventEmitter();

  notifParent(e: Eventy) {
    this.eventNotifParent.emit(e);
  }

  nbrPlaceDecr(e: Eventy) {
    this.eventBuyTicket.emit(e);
  }

  deleteEvent(e: Eventy) {
    this.eventDelete.emit(e);
  }
}

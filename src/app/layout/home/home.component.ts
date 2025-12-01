import { Component } from '@angular/core';
import { DataEventsService } from '../../shared/services/data-events.service';
import { Eventy } from '../../models/eventy';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 events: Eventy[] = [];
  searchValue: string = '';

  constructor(private dataService: DataEventsService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.dataService.getAllEvents().subscribe(res => {
      // Trie les événements par nbrLikes décroissant
      this.events = res.sort((a, b) => b.nbrLikes - a.nbrLikes).slice(0, 3);
    });
  }

  handleLike(event: Eventy) {
    this.dataService.likeEvent(event.id).subscribe(() => this.loadEvents());
  }

  handleBuy(event: Eventy) {
    this.dataService.buyTicket(event)?.subscribe(() => this.loadEvents());
  }

  handleDelete(event: Eventy) {
    this.dataService.deleteEvent(event.id).subscribe(() => this.loadEvents());
  }
}
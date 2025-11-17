import { Component, OnInit, OnDestroy } from '@angular/core';
import { Eventy } from '../../../models/eventy';
import { DataEventsService } from '../../../shared/services/data-events.service';
import { FilterService } from '../../../shared/services/filter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrl: './list-event.component.css',
})
export class ListEventComponent implements OnInit, OnDestroy {
  list: Eventy[] = [];
  searchTerm: string = '';
  selectedLocation: string = '';
  private filterSubscription: Subscription;
  private eventsSubscription: Subscription;

  constructor(
    private dataService: DataEventsService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    // S'abonner à l'Observable retourné par le service
    this.eventsSubscription = this.dataService.getAllEvents().subscribe({
      next: (events) => {
        this.list = events;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
        this.list = [];
      }
    });
    
    // S'abonner aux changements de filtres depuis la sidebar
    this.filterSubscription = this.filterService.filters$.subscribe(filters => {
      this.searchTerm = filters.searchText;
      this.selectedLocation = filters.selectedLocation;
    });
  }

  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  get filteredList(): Eventy[] {
    let filtered = this.list;

    // Filtre par titre
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filtre par lieu
    if (this.selectedLocation && this.selectedLocation !== '') {
      filtered = filtered.filter(event => 
        event.location === this.selectedLocation
      );
    }

    return filtered;
  }

  likeEvent(event: Eventy) {
    event.nbrLikes++;
    // Mettre à jour l'événement dans le backend
    this.dataService.updateEvent(event.id, event).subscribe({
      next: (updatedEvent) => {
        console.log('Événement mis à jour:', updatedEvent);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour:', error);
        // Annuler l'incrémentation en cas d'erreur
        event.nbrLikes--;
      }
    });
  }
}
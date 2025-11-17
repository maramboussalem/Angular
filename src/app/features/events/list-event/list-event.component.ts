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
  list: Eventy[];
  private filters: any = {};
  private filterSubscription: Subscription;

  constructor(
    private dataService: DataEventsService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.list = this.dataService.getAllEvents();
    
    this.filterSubscription = this.filterService.filters$.subscribe(filters => {
      this.filters = filters;
    });
  }

  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

  get filteredList(): Eventy[] {
    let filtered = this.list;

    // Filtre par titre
    if (this.filters.searchText && this.filters.searchText.trim() !== '') {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(this.filters.searchText.toLowerCase())
      );
    }

    // Filtre par lieu
    if (this.filters.selectedLocation && this.filters.selectedLocation !== '') {
      filtered = filtered.filter(event => 
        event.location === this.filters.selectedLocation
      );
    }

    // Filtre par prix min
    if (this.filters.minPrice !== null && this.filters.minPrice !== '') {
      filtered = filtered.filter(event => 
        event.price >= this.filters.minPrice
      );
    }

    // Filtre par prix max
    if (this.filters.maxPrice !== null && this.filters.maxPrice !== '') {
      filtered = filtered.filter(event => 
        event.price <= this.filters.maxPrice
      );
    }

    // Filtre par date
    const today = new Date();
    const oneWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const oneMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    if (this.filters.dateFilter === 'upcoming') {
      filtered = filtered.filter(event => new Date(event.date) >= today);
    } else if (this.filters.dateFilter === 'thisWeek') {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= oneWeek;
      });
    } else if (this.filters.dateFilter === 'thisMonth') {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= oneMonth;
      });
    }

    // Filtre par disponibilité
    if (this.filters.availabilityFilter === 'available') {
      filtered = filtered.filter(event => event.nbrPlaces > 0);
    } else if (this.filters.availabilityFilter === 'full') {
      filtered = filtered.filter(event => event.nbrPlaces === 0);
    }

    // Filtre par organisateur
    if (this.filters.organizerId !== null && this.filters.organizerId !== '') {
      filtered = filtered.filter(event => 
        event.organizerId === Number(this.filters.organizerId)
      );
    }

    return filtered;
  }

  likeEvent(event: Eventy) {
    event.nbrLikes++;
  }
}
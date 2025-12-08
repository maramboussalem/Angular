import { Component, OnInit, OnDestroy } from '@angular/core';
import { Eventy } from '../../../models/eventy';
import { DataEventsService } from '../../../shared/services/data-events.service';
import { FilterService } from '../../../shared/services/filter.service';
import { Subscription } from 'rxjs';
import { TicketsService } from '../../../shared/services/tickets/tickets.service';
import { AuthService } from '../../../shared/services/user/auth.service';
import { Ticket } from '../../../models/ticket';

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
  minPrice: number | null = null;
  maxPrice: number | null = null;
  availabilityFilter: string = 'all';
  dateFilter: string = 'all';
  organizerId: number | null = null;


  constructor(
    private dataService: DataEventsService,
    private filterService: FilterService,
    private ticketService: TicketsService,
  private authService: AuthService
  ) {}

  ngOnInit() {
    this.eventsSubscription = this.dataService.getAllEvents().subscribe({
      next: (events) => {
        this.list = events;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
        this.list = [];
      }
    });
     this.filterSubscription = this.filterService.filters$.subscribe(filters => {
     this.searchTerm = filters.searchText;
     this.selectedLocation = filters.selectedLocation;
     this.minPrice = filters.minPrice;
     this.maxPrice = filters.maxPrice;
     this.dateFilter = filters.dateFilter;
     this.availabilityFilter = filters.availabilityFilter;
     this.organizerId = filters.organizerId;
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
      return this.list.filter(event => {
      // Filtre par titre
      const matchTitle = !this.searchTerm || event.title.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filtre par lieu
      const matchLocation = !this.selectedLocation || event.location === this.selectedLocation;

      // Filtre par prix
      const matchMinPrice = !this.minPrice || event.price >= this.minPrice;
      const matchMaxPrice = !this.maxPrice || event.price <= this.maxPrice;

     // Filtre par disponibilité
      const matchAvailability =
      !this.availabilityFilter ||
      this.availabilityFilter === 'all' ||
      (this.availabilityFilter === 'available' && event.nbrPlaces > 0) ||
      (this.availabilityFilter === 'full' && event.nbrPlaces === 0);

     // Filtre par organisateur
      const matchOrganizer = !this.organizerId || event.organizerId === this.organizerId;

      return matchTitle && matchLocation && matchMinPrice && matchMaxPrice &&
           matchAvailability  && matchOrganizer;
    });
  }


  likeEvent(event: Eventy) {
  event.nbrLikes++;
  this.dataService.updateEvent(event.id, event).subscribe(() => {
  });
  }

  buyTicket(event: Eventy) {
  const user = this.authService.getCurrentUser();
  if (!user) {
    alert('Veuillez vous connecter pour acheter un ticket.');
    return;
  }

  if (event.nbrPlaces <= 0) {
    alert('Plus de places disponibles !');
    return;
  }

  event.nbrPlaces--;
  this.dataService.updateEvent(event.id, event).subscribe({
    next: () => {
      console.log("Nombre de places mis à jour !");

      const ticket: Ticket = {
        id: 0, 
        userId: user.id.toString(),    
        eventId: event.id.toString(), 
        price: event.price,
        date: new Date(),
        valid: true
      };

      this.ticketService.addTicket(ticket).subscribe({
        next: () => alert('Ticket acheté avec succès !'),
        error: (err) => console.error('Erreur création ticket:', err)
      });
    },
    error: (err) => console.error(err)
  });
}



  onDelete(eventToDelete: Eventy) {
    if (confirm(`Voulez-vous vraiment supprimer l'événement "${eventToDelete.title}" ?`)) {
      this.dataService.deleteEvent(eventToDelete.id).subscribe(() => {
      this.list = this.list.filter(e => e.id !== eventToDelete.id);
    });
  }
  }

  dislikeEvent(event: Eventy) {
  if (event.nbrLikes > 0) {
    event.nbrLikes--;
    this.dataService.updateEvent(event.id, event).subscribe(() => {});
  }
}


}
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../../models/ticket';
import { AuthService } from '../../../shared/services/user/auth.service';
import { Eventy } from '../../../models/eventy';
import { DataEventsService } from '../../../shared/services/data-events.service';
import { TicketsService } from '../../../shared/services/tickets/tickets.service';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrl: './list-ticket.component.css'
})
export class ListTicketComponent implements OnInit {
  tickets: Ticket[] = [];
  currentUserId!: string;  
  listEvents: Eventy[] = [];

  constructor(
    private ticketService: TicketsService,
    private authService: AuthService,
    private eventService: DataEventsService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      alert('Veuillez vous connecter pour voir vos tickets.');
      return;
    }

    this.currentUserId = user.id.toString(); 
    this.loadTickets();
    this.loadEvents();
  }

  loadTickets(): void {
    this.ticketService.getTicketsByUser(this.currentUserId).subscribe({
      next: (res) => this.tickets = res,
      error: (err) => console.error(err)
    });
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (res) => this.listEvents = res,
      error: (err) => console.error(err)
    });
  }

  getEventTitle(eventId: string): string {
    const event = this.listEvents.find(e => e.id.toString() === eventId);
    return event ? event.title : 'Événement supprimé';
  }

  deleteTicket(ticket: Ticket): void {
    if (!ticket.id) return;
    if (!confirm('Voulez-vous vraiment supprimer ce ticket ?')) return;

    this.ticketService.deleteTicket(ticket.id).subscribe({
      next: () => this.loadTickets(),
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la suppression du ticket');
      }
    });
  }

  toggleValid(ticket: Ticket): void {
    if (!ticket.id) return;
    const updatedTicket = { ...ticket, valid: !ticket.valid };
    this.ticketService.updateTicket(ticket.id, updatedTicket).subscribe({
      next: () => this.loadTickets(),
      error: (err) => console.error(err)
    });
  }
}

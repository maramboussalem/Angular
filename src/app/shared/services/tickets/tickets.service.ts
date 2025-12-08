import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../../../models/ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private urlBackend = 'http://localhost:3000/tickets';

  constructor(private http: HttpClient) {}

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.urlBackend);
  }

  getTicketsByUser(userId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.urlBackend}?userId=${userId}`);
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.urlBackend}/${id}`);
  }

  addTicket(ticket: Ticket): Observable<Ticket> {
    const { id, ...rest } = ticket;
    return this.http.post<Ticket>(this.urlBackend, rest);
  }

  updateTicket(id: number, ticket: Ticket): Observable<Ticket> {
  return this.http.put<Ticket>(`${this.urlBackend}/${id}`, ticket); 
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBackend}/${id}`);
  }
}

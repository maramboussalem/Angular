import { Injectable } from '@angular/core';
import { Eventy } from '../../models/eventy';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataEventsService {

  urlBackend = 'http://localhost:8089/events';

  constructor(private http: HttpClient) {}

  getAllEvents() {
    return this.http.get<Eventy[]>(`${this.urlBackend}`);
  }

  getEventById(id: number) {
    return this.http.get<Eventy>(`${this.urlBackend}/${id}`);
  }

  addEvent(e: Eventy) {
    return this.http.post<Eventy>(`${this.urlBackend}`, e);
  }

  deleteEvent(id: number) {
    return this.http.delete(`${this.urlBackend}/${id}`);
  }

  updateEvent(id: number, e: Eventy) {
    return this.http.put<Eventy>(`${this.urlBackend}/${id}`, e);
  }

  likeEvent(id: number) {
    return this.http.put<Eventy>(`${this.urlBackend}/${id}/like`, {});
  }

  buyTicket(event: Eventy) {
  if (event.nbrPlaces > 0) {
    const updatedEvent = { ...event, nbrPlaces: event.nbrPlaces - 1 }; // clone et décrémente
    return this.http.put<Eventy>(`${this.urlBackend}/${event.id}`, updatedEvent);
  }
  return null;
}

}

import { Component, OnInit } from '@angular/core';
import { DataEventsService } from '../../../shared/services/data-events.service';
import { ActivatedRoute } from '@angular/router';
import { Eventy } from '../../../models/eventy';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrl: './detail-event.component.css'
})
export class DetailEventComponent implements OnInit {
  event?: Eventy;
  loading: boolean = true;
  error: string = '';

  constructor(
    private currentRoute: ActivatedRoute,
    private dataService: DataEventsService
  ) {}

  ngOnInit() {
    const eventId = +this.currentRoute.snapshot.params['id'];
    
    this.dataService.getEventById(eventId).subscribe({
      next: (event) => {
        this.event = event;
        this.loading = false;
        console.log('Événement chargé:', this.event);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'événement:', error);
        this.error = 'Impossible de charger l\'événement';
        this.loading = false;
      }
    });
  }
}
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Eventy } from '../../../models/eventy';
import { EventService } from '../../../shared/services/event.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrl: './detail-event.component.css'
})
export class DetailEventComponent implements OnInit {
//read URL
//get event by id
//display event details
event?: Eventy;
constructor(private route:ActivatedRoute, private eventService:EventService ) {
}
ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.event = this.eventService.getEventById(id);
}
}

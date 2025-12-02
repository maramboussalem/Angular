import {Component, OnInit} from '@angular/core';
import {EventsService} from '../../shared/data/events.service';
import {Eventy} from '../../models/eventy';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  list:Eventy[]
   constructor(private service: EventsService) {
   }
   ngOnInit() {
     this.service.getAllEvents().subscribe(
       res => {
         this.list = res.sort((a, b)=> b.nbrLike - a.nbrLike).slice(0, 3);

       }
     )
   }
}

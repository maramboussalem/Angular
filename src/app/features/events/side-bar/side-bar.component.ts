import {Component, OnInit} from '@angular/core';
import {EventsService} from '../../../shared/data/events.service';

@Component({
  selector: 'events-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {
public inputLocation: string;
constructor(private eventService: EventsService) {

}
ngOnInit() {
  console.log(this.inputLocation);
}
search(){
  console.log(this.inputLocation);


}


}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import {ListEventComponent} from './list-event/list-event.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import { DetailEventComponent } from './detail-event/detail-event.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import {DataEventsService} from '../../shared/services/data-events.service';
import { CardEventComponent } from './card-event/card-event.component';
import { FormEventComponent } from './form-event/form-event.component';


@NgModule({
  declarations: [
    EventsComponent,
    ListEventComponent,
    DetailEventComponent,
    SideBarComponent,
    CardEventComponent,
    FormEventComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    FormsModule,
  ],
 // providers:[DataEventsService]
})
export class EventsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import {ListEventComponent} from './list-event/list-event.component';
import { DetailEventComponent } from './detail-event/detail-event.component';
import {FormsModule} from "@angular/forms";
import { SideBarComponent } from './side-bar/side-bar.component';
import { CardEventComponent } from './card-event/card-event.component';
import {SharedModule} from '../../shared/shared.module';
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
    FormsModule,
    SharedModule
  ]

})
export class EventsModule { }

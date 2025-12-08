import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';

const routes: Routes = [
  { path: '', component: TicketsComponent },
  { path: 'list-ticket', component: ListTicketComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TicketsRoutingModule { }

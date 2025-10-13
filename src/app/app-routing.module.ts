import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './layout/home/home.component';
import {NotFoundComponent} from './layout/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'home', redirectTo:'', pathMatch:'full'},
  {path:'events', loadChildren: () => import('./features/events/events.module').then(m => m.EventsModule) },
  { path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule) },
  { path: 'feedbacks', loadChildren: () => import('./features/feedbacks/feedbacks.module').then(m => m.FeedbacksModule) },
  { path: 'tickets', loadChildren: () => import('./features/tickets/tickets.module').then(m => m.TicketsModule) },
  {path:'**', component: NotFoundComponent},

];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { GroupesComponent } from './groupes/groupes.component';
import { LoginComponent } from './User/login/login.component';
import { InscriptionComponent } from './User/inscription/inscription.component';
import { QuizBuilderComponent } from './quiz-builder/quiz-builder.component';
import { ProfilComponent } from './User/profil/profil.component';
import { ClassesComponent } from './classes/classes.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MessageComponent } from './message/message.component';
import { IslandComponent } from './island/island.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'groupes', component: GroupesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'quiz-builder', component: QuizBuilderComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'Classes', component: ClassesComponent },
  { path: 'Calendar', component: CalendarComponent },
  { path: 'Message', component: MessageComponent },
  { path: 'Island', component: IslandComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

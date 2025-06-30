import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GroupesComponent } from './groupes/groupes.component';
import { LoginComponent } from './User/login/login.component';
import { InscriptionComponent } from './User/inscription/inscription.component';
import { QuizBuilderComponent } from './quiz-builder/quiz-builder.component';
import { FormsModule } from '@angular/forms';
import { ProfilComponent } from './User/profil/profil.component';
import { ClassesComponent } from './classes/classes.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MessageComponent } from './message/message.component';
import { IslandComponent } from './island/island.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    GroupesComponent,
    LoginComponent,
    InscriptionComponent,
    QuizBuilderComponent,
    ProfilComponent,
    ClassesComponent,
    CalendarComponent,
    MessageComponent,
    IslandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

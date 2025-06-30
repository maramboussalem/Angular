import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  calendarDates: { day: number, date: Date, event?: { title: string, time: string } }[] = [];

  // Exemple d'événements
  events = [
    { date: new Date(new Date().setDate(new Date().getDate() + 2)), title: 'Quiz Math', time: '10:00 AM' },
    { date: new Date(new Date().setDate(new Date().getDate() + 5)), title: 'Cours Physique', time: '14:00 PM' },
    { date: new Date(new Date().setDate(new Date().getDate() + 10)), title: 'Événement spécial', time: '09:00 AM' }
  ];

  ngOnInit() {
    this.generate30Days();
  }

  generate30Days() {
    const today = new Date();
    this.calendarDates = [];

    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Chercher un event pour ce jour (comparaison simple date sans l'heure)
      const eventForDay = this.events.find(ev => 
        ev.date.getFullYear() === currentDate.getFullYear() &&
        ev.date.getMonth() === currentDate.getMonth() &&
        ev.date.getDate() === currentDate.getDate()
      );

      this.calendarDates.push({
        day: currentDate.getDate(),
        date: currentDate,
        event: eventForDay ? { title: eventForDay.title, time: eventForDay.time } : undefined
      });
    }
  }
}

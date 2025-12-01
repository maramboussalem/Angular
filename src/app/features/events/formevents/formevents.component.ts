import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../shared/data/events.service';
import { Eventy } from '../../../models/eventy';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
selector: 'app-formevents',
templateUrl: './formevents.component.html',
styleUrl: './formevents.component.css'
})
export class FormeventsComponent implements OnInit {
eventy: Eventy = new Eventy();
today: string = new Date().toISOString().split('T')[0];
isEditMode = false;


constructor(
private dataService: EventsService,
private router: Router,
private route: ActivatedRoute
) {}


ngOnInit(): void {
// si route contient un id => mode édition
const idParam = this.route.snapshot.params['id'];
if (idParam) {
this.isEditMode = true;
const id = Number(idParam);
this.dataService.getEventById(id).subscribe({
next: (ev) => this.eventy = ev,
error: (err) => console.error('Erreur chargement event', err)
});
}
}


save() {
if (this.isEditMode && this.eventy.id) {
this.dataService.updateEvent(this.eventy.id, this.eventy).subscribe({
next: () => {
alert('Événement mis à jour ✅');
this.router.navigate(['../'], { relativeTo: this.route });
},
error: (err) => console.error('Erreur update', err)
});
} else {
this.dataService.addEvent(this.eventy).subscribe({
next: () => {
alert('Événement ajouté ✅');
this.router.navigate(['../'], { relativeTo: this.route });
},
error: (err) => console.error('Erreur add', err)
});
}
}
}
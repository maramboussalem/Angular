import { Component } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent {
selectedClass: string | null = null;

  toggleDetails(className: string) {
    this.selectedClass = this.selectedClass === className ? null : className;
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.css']
})
export class GroupesComponent {
  groups = [
    {
      name: 'Group 1',
      students: ['Student A', 'Student B', 'Student C','Student D', 'Student E', 'Student F'],
    },
    {
      name: 'Group 2 ',
      students: ['Student A', 'Student B', 'Student C','Student D', 'Student E', 'Student F'],
    },
    {
      name: 'Group 3',
      students: ['Student G', 'Student H'],
    },
  ];

  newStudent: { [groupName: string]: string } = {};

  addStudent(group: any) {
    const name = this.newStudent[group.name];
    if (name && name.trim() !== '') {
      group.students.push(name.trim());
      this.newStudent[group.name] = '';
    }
  }

  removeStudent(group: any, index: number) {
    group.students.splice(index, 1);
  }
}

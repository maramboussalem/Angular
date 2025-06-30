import { Component } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
 name = 'Maram Boussalem';
  role = 'University Teacher';
  quote = "I'm looking for simple tools to boost student engagement.";
  age = 38;
  status = 'Married';
  specialty = 'Computer Science';
  location = 'Tunis, Tunisia';
  profileType = 'Experienced Teacher';
  avatarUrl = 'https://i.pravatar.cc/150?img=32';

  tags = ['Educator', 'Patient', 'Demanding', 'Creative', 'Organized'];

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.avatarUrl = URL.createObjectURL(file);
    }
  }
}

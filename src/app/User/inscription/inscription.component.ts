import { Component } from '@angular/core';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  selectedAvatar: string = '';

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
    console.log('Avatar choisi :', avatar);
  }

  playSound(type: string) {
    const audio = new Audio();
    if (type === 'click') {
      audio.src = 'assets/sounds/click.mp3'; // Remplace ce chemin par le tien
      audio.load();
      audio.play();
    }
  }
}

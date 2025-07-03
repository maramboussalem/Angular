import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  // Input pour le type de message : 'success', 'error', 'info', etc.
  @Input() type: 'success' | 'error' | 'info' | 'default' = 'default';

  // Input pour le titre et le texte du message
  @Input() title: string = 'Notification';
  @Input() text: string = '';

  // Output pour prévenir le parent que le message est fermé
  @Output() closed = new EventEmitter<void>();

  // Méthode appelée au clic sur la croix pour fermer le message
  close() {
    this.closed.emit();
  }
}

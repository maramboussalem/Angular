import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  type: string = 'success'; // ou 'error', 'info', 'warning', 'primary'
title: string = 'SUCCESS';
text: string = 'This is a regular notification made with ".alert-success"';
notifications = [
  {
    type: 'info',
    title: 'INFO',
    text: 'This is a regular notification made with ".alert-info"'
  },
  {
    type: 'success',
    title: 'SUCCESS',
    text: 'This is a regular notification made with ".alert-success"'
  },
  {
    type: 'warning',
    title: 'WARNING',
    text: 'This is a regular notification made with ".alert-warning"'
  },
  {
    type: 'error',
    title: 'DANGER',
    text: 'This is a regular notification made with ".alert-danger"'
  },
  {
    type: 'primary',
    title: 'PRIMARY',
    text: 'This is a regular notification made with ".alert-primary"'
  },
  {
    type: 'info',
    title: 'PLAIN',
    text: 'This is a plain notification.'
  },
  {
    type: 'info',
    title: 'CLOSE BUTTON',
    text: 'This is a notification with a close button.'
  },
  {
    type: 'info',
    title: 'ICON & CLOSE',
    text: 'This is a notification with close button and icon.'
  },
  {
    type: 'info',
    title: 'MULTILINE',
    text: 'This is a notification with close button and icon and have many lines. You can see that the icon and the close button are always vertically aligned. This is a beautiful notification. So you don’t have to worry about the style.'
  }
];

close(index: number) {
  this.notifications.splice(index, 1);
}


}

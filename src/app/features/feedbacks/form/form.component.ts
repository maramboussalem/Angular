import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FeedbackService } from '../../../shared/data/feedback.service';
import { Feedback } from '../../../models/feedback';

type EventsResponse = any[] | { events: any[] };

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

}

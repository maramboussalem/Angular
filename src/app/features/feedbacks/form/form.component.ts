import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../../shared/services/feedback.service';
import { DataEventsService } from '../../../shared/services/data-events.service';
import { Feedback } from '../../../models/feedback';
import { Eventy } from '../../../models/eventy';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  feedbacks: Feedback[] = [];
  newFeedback: Feedback = {} as Feedback;

  editFeedbackId: string | undefined;
  editFeedbackData: Feedback = {} as Feedback;

  currentEvent: Eventy = {} as Eventy;         
  sameLocationEvents: Eventy[] = [];         

  constructor(
    private feedbackService: FeedbackService,
    private dataEventsService: DataEventsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idEvent = this.route.snapshot.paramMap.get('id');
    const eventId = idEvent ? Number(idEvent) : 0;
    this.newFeedback.eventId = eventId;

    this.loadFeedbacks();
//
    this.dataEventsService.getEventById(eventId).subscribe(event => {
      this.currentEvent = event;

      this.dataEventsService.getAllEvents().subscribe(events => {
        this.sameLocationEvents = events.filter(
          e => e.location === this.currentEvent.location && e.id !== this.currentEvent.id
        );
      });
    });
  }

  loadFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe((res: Feedback[]) => {
      this.feedbacks = res.filter(f => Number(f.eventId) === this.newFeedback.eventId);
    });
  }

  addFeedback(): void {
    this.newFeedback.dateFeedback = new Date();
    this.feedbackService.addFeedback(this.newFeedback).subscribe(() => {
      this.loadFeedbacks();
      this.newFeedback.content = '';
      this.newFeedback.rate = 0;
    });
  }

  startEdit(fb: Feedback): void {
    this.editFeedbackId = fb.id!;
    this.editFeedbackData = { ...fb };
  }

  saveEdit(): void {
    if (this.editFeedbackId) {
      this.editFeedbackData.dateFeedback = new Date();
      this.feedbackService.updateFeedback(this.editFeedbackId, this.editFeedbackData).subscribe(() => {
        this.loadFeedbacks();
        this.cancelEdit();
      });
    }
  }

  cancelEdit(): void {
    this.editFeedbackId = undefined;
    this.editFeedbackData = {} as Feedback;
  }

  deleteFeedback(id: string | undefined): void {
    if (!id) return;
    if (confirm('Êtes-vous sûr de vouloir supprimer ce feedback ?')) {
      this.feedbackService.deleteFeedback(id).subscribe(() => this.loadFeedbacks());
    }
  }
}

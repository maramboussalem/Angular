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
export class FormComponent implements OnInit {

  feedback: Feedback = {
    id: 0,
    userId: 0,
    eventId: 0,
    content: '',
    rate: 1,
    dateFeedback: new Date()
  };

  events: any[] = [];
  allFeedbacks: Feedback[] = []; // liste locale de tous les feedbacks

  // UI state
  activeEventId: number | null = null;
  showFormForEvent = false;
  loading = false;

  // édition inline
  editingFeedbackId: number | null = null;
  editedFeedback: Partial<Feedback> = {};

  constructor(
    private http: HttpClient,
    private feedbackService: FeedbackService
  ) {
  }

  ngOnInit(): void {
    this.loadEvents();
    this.loadFeedbacks();
  }

  /*************** chargements ***************/
  private loadEvents(): void {
    this.http.get<EventsResponse>('http://localhost:3000/events')
      .subscribe({
        next: res => {
          if (Array.isArray(res)) {
            this.events = res;
          } else if (res && typeof res === 'object' && Array.isArray((res as any).events)) {
            this.events = (res as { events: any[] }).events;
          } else {
            console.warn('Format de réponse /events inattendu', res);
            this.events = [];
          }
        },
        error: err => {
          console.error('Erreur chargement events', err);
          this.events = [];
        }
      });
  }

  private loadFeedbacks(): void {
    this.feedbackService.getFeedbacks()
      .subscribe({
        next: (res: Feedback[]) => {
          this.allFeedbacks = (res || []).map(f => ({
            ...f,
            date: f.dateFeedback ? new Date(f.dateFeedback) : new Date()
          }));
        },
        error: err => {
          console.error('Erreur chargement feedbacks', err);
          this.allFeedbacks = [];
        }
      });
  }

  /*************** UI helpers ***************/
  feedbacksForEvent(eventId: number): Feedback[] {
    return this.allFeedbacks
      .filter(f => Number(f.eventId) === Number(eventId))
      .sort((a, b) => (b.dateFeedback?.getTime() ?? 0) - (a.dateFeedback?.getTime() ?? 0));
  }

  toggleComments(eventId: number): void {
    if (this.activeEventId === eventId) {
      this.activeEventId = null;
      this.showFormForEvent = false;
      this.cancelEdit();
    } else {
      this.activeEventId = eventId;
      this.showFormForEvent = false;
      this.cancelEdit();
    }
  }

  openFormForActiveEvent(): void {
    if (this.activeEventId == null) return;
    this.resetLocal();
    this.showFormForEvent = true;
    this.feedback.eventId = this.activeEventId;
  }

  closeForm(): void {
    this.showFormForEvent = false;
    this.resetLocal();
  }

  /*************** soumission ajout ***************/
  submitFeedback(form?: NgForm): void {
    if (!this.activeEventId) {
      alert('Aucun événement actif sélectionné.');
      return;
    }

    if (!this.feedback.content || this.feedback.content.trim().length === 0) {
      alert('Merci d\'écrire un message.');
      return;
    }

    this.feedback.eventId = Number(this.activeEventId);
    this.feedback.dateFeedback = new Date();
    this.feedback.userId = Number(this.feedback.userId) || 0;
    this.feedback.rate = Number(this.feedback.rate) || 1;

    this.loading = true;
    this.feedbackService.createFeedback(this.feedback)
      .subscribe({
        next: (created: Feedback) => {
          const normalized: Feedback = {
            ...created,
            dateFeedback: created.dateFeedback ? new Date(created.dateFeedback) : new Date()
          };

          this.allFeedbacks = [normalized, ...this.allFeedbacks];
          this.showFormForEvent = false;
          if (form) form.resetForm();
          this.resetLocal();
          this.loading = false;
        },
        error: err => {
          console.error('Erreur création feedback', err);
          alert('Impossible d\'ajouter le feedback (voir console).');
          this.loading = false;
        }
      });
  }

  /*************** suppression et modification (logique de ton autre code) ***************/
  deleteFeedback(id: number | undefined): void {
    if (id == null) return;
    if (!confirm('Supprimer ce commentaire ? Cette action est irréversible.')) return;

    this.feedbackService.deleteFeedback(Number(id))
      .subscribe({
        next: () => {
          this.allFeedbacks = this.allFeedbacks.filter(f => f.id !== id);
        },
        error: err => {
          console.error('Erreur suppression feedback', err);
          alert('Impossible de supprimer le commentaire (voir console).');
        }
      });
  }

  startEdit(fb: Feedback): void {
    this.editingFeedbackId = fb.id ?? null;
    this.editedFeedback = {
      id: fb.id,
      userId: fb.userId,
      eventId: fb.eventId,
      content: fb.content,
      //f
      rate: fb.rate,
      dateFeedback: fb.dateFeedback
    };
    this.activeEventId = Number(fb.eventId);
    this.showFormForEvent = false;
  }

  cancelEdit(): void {
    this.editingFeedbackId = null;
    this.editedFeedback = {};
  }

  saveEdit(): void {
    if (this.editingFeedbackId == null) return;
    const id = this.editingFeedbackId;

    const updated: Feedback = {
      id: Number(this.editedFeedback.id ?? id),
      userId: Number(this.editedFeedback.userId ?? 0),
      eventId: Number(this.editedFeedback.eventId ?? this.activeEventId ?? 0),
      content: String(this.editedFeedback.content ?? '').trim(),
      rate: Number(this.editedFeedback.rate ?? 1),
      dateFeedback: new Date()
    };

    if (!updated.content) {
      alert('Le commentaire ne peut pas être vide.');
      return;
    }

    this.feedbackService.updateFeedback(updated)
      .subscribe({
        next: res => {
          const normalized: Feedback = {
            ...updated,
           // date: res && res.date ? new Date(res.date) : updated.date
          };
          this.allFeedbacks = this.allFeedbacks.map(f => f.id === id ? normalized : f);
          this.cancelEdit();
        },
        error: err => {
          console.error('Erreur mise à jour feedback', err);
          alert('Impossible de modifier le commentaire (voir console).');
        }
      });
  }

  /*************** util ***************/
  private resetLocal(): void {
    this.feedback = {
      id: 0,
      userId: 0,
      eventId: this.activeEventId ?? 0,
      content: '',
      rate: 1,
      dateFeedback: new Date()
    };
  }
}

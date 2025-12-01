import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbacksRoutingModule } from './feedbacks-routing.module';
import { FeedbacksComponent } from './feedbacks.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FeedbacksComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    FeedbacksRoutingModule,
    FormsModule,
    FeedbacksRoutingModule
  ]
})
export class FeedbacksModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbacksRoutingModule } from './feedbacks-routing.module';
import { FeedbacksComponent } from './feedbacks.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    FeedbacksComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    FeedbacksRoutingModule,
    FormsModule,
    CommonModule,
    SharedModule
  ]
})
export class FeedbacksModule { }

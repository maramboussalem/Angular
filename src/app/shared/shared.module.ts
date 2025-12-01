import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePersPipe } from './pipes/date-pers.pipe';
import { NgHoverDirective } from './directives/ng-hover.directive';



@NgModule({
  declarations: [
    DatePersPipe,
    NgHoverDirective
  ],
  exports: [
    NgHoverDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePersPipe } from './pipes/date-pers.pipe';
import { NgHoverDirective } from './directives/ng-hover.directive';
import { EuroPipe } from './pipes/euro.pipe';



@NgModule({
  declarations: [
    DatePersPipe,
    NgHoverDirective,
    EuroPipe
  ],
  exports: [
    NgHoverDirective,
    EuroPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

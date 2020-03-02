import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { ToHoursPipe } from './pipes/to-hours.pipe';
import { HighlightDirective } from './directives/highlighting.directive';



@NgModule({
  declarations: [CourseItemComponent, ToHoursPipe, HighlightDirective],
  imports: [
    CommonModule
  ],
  exports: [CourseItemComponent, ToHoursPipe, HighlightDirective]
})
export class SharedModule { }

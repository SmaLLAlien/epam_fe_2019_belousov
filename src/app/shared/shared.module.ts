import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { ToHoursPipe } from './pipes/to-hours.pipe';
import { HighlightDirective } from './directives/highlighting.directive';
import { ErrorDialogComponent } from './components/errordialog/error-dialog.component';



@NgModule({
  declarations: [CourseItemComponent, ToHoursPipe, HighlightDirective, ErrorDialogComponent],
  imports: [
    CommonModule
  ],
  exports: [CourseItemComponent, ToHoursPipe, HighlightDirective, ErrorDialogComponent]
})
export class SharedModule { }

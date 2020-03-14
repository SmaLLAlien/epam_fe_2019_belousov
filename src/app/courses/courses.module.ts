import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './containers/courses/courses.component';
import {CoursesRoutingModule} from './courses.routing-module';
import { SearchComponent } from './components/search/search.component';
import { CourseComponent } from './containers/course/course.component';
import { AddCourseFormComponent } from './components/add-course-form/add-course-form.component';
import {CourseService} from './services/course.service';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';




@NgModule({
  declarations: [CoursesComponent, SearchComponent, CourseComponent, AddCourseFormComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [CourseService]
})
export class CoursesModule { }

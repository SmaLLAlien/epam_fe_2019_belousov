import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CoursesComponent} from './containers/courses/courses.component';
import {CourseComponent} from './containers/course/course.component';
import {AddCourseFormComponent} from './components/add-course-form/add-course-form.component';


const routes: Routes = [
  {
    path: '',
    component: CoursesComponent
  },
  {
    path: 'add',
    component: CourseComponent
  },
  {
    path: ':id',
    component: CourseComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }

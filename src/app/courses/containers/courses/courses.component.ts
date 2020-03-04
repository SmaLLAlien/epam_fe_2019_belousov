import { Component, OnInit } from '@angular/core';
import {tap} from 'rxjs/operators';

import {Course} from '../../../core/models/course.model';
import {CourseService} from '../../services/course.service';
import {ErrorDialogService} from '../../../core/services/error-dialog/error-dialog.service';
import {Error} from '../../../core/models/error.model';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[];
  error: Error;

  constructor(private courseService: CourseService, private errorDialogService: ErrorDialogService) { }

  ngOnInit(): void {
    this.courseService.loadCourses().subscribe();

    this.courseService.course.pipe(
      tap(courses => this.courses = courses),
    ).subscribe();

    this.errorDialogService.errorSend.pipe(
      tap(error =>  this.error = error)
    ).subscribe();
  }


  onDelete(id: number) {
    this.courseService.removeCourseById(id).subscribe();

    this.courseService.course.pipe(
      tap(courses => this.courses = courses)
    ).subscribe();
  }

  closeError() {
    this.errorDialogService.closeDialog();
  }
}

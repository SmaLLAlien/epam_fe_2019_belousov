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
  loaded = true;

  constructor(private courseService: CourseService, private errorDialogService: ErrorDialogService) { }

  ngOnInit(): void {
    this.courseService.loadCourses().subscribe();

    this.courseService.course.pipe(
      tap((courses: Course[]) => this.courses = courses),
    ).subscribe();

    this.errorDialogService.errorSend.pipe(
      tap((error: Error) =>  this.error = error)
    ).subscribe();
  }


  onDelete(id: string) {
    this.courseService.removeCourseById(id).subscribe();

    this.courseService.course.pipe(
      tap((courses: Course[]) => this.courses = courses)
    ).subscribe();
  }

  closeError() {
    this.errorDialogService.closeDialog();
  }

  onEdit(id: string) {
    this.courseService.navigateById(id);
  }

  findCourseFromSearch(inputData: string) {
    this.courseService.loadCourses(inputData).subscribe();
    this.courseService.course.pipe(
      tap((courses: Course[]) => {
        if (courses.length) {
          this.courses = courses;
          this.loaded = true;
        } else {
          this.loaded = false;
        }
      })
    ).subscribe();
  }
}



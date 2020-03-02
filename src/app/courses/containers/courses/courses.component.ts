import { Component, OnInit } from '@angular/core';
import {catchError, tap} from 'rxjs/operators';

import {Course} from '../../../core/models/course.model';
import {CourseService} from '../../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[];
  error: string;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.loadCourses().pipe(
      catchError(error => this.error = error)
    ).subscribe();

    this.courseService.course.pipe(
      tap(courses => this.courses = courses),
    ).subscribe();
  }


  onDelete(id: number) {
    this.courseService.removeCourseById(id).pipe(
      catchError(error => this.error = error)
    ).subscribe();

    this.courseService.course.pipe(
      tap(courses => this.courses = courses)
    ).subscribe();
  }

  onErrorHandle() {
    this.error = null;
  }
}

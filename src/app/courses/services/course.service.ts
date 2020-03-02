import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {Course} from '../../core/models/course.model';
import {CourseApiService} from '../../core/services/course-api/course.api-service';
import {switchMap, tap} from 'rxjs/operators';

@Injectable()
export class CourseService {
  private courseSubject: Subject<Course[]> = new Subject();
  course = this.courseSubject.asObservable();

  constructor(private courseApiService: CourseApiService) { }

  loadCourses(): Observable<Course[]> {
    return this.getCourses().pipe(
      tap(meals => this.courseSubject.next(meals))
    );
  }

  removeCourseById(id: number) {
    return this.deleteCourse(id).pipe(
      switchMap(() => this.getCourses()),
      tap(courses => this.courseSubject.next(courses))
    );
  }

  private getCourses(): Observable<Course[]> {
    return this.courseApiService.getCourses();
  }

  private deleteCourse(id: number): Observable<{}> {
    return this.courseApiService.deleteCourse(id);
  }
}


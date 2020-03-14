import { Injectable } from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';

import {Course} from '../../core/models/course.model';
import {CourseApiService} from '../../core/services/course-api/course.api-service';
import {switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class CourseService {
  private courseSubject: Subject<Course[]> = new Subject();
  course = this.courseSubject.asObservable();

  constructor(private courseApiService: CourseApiService,
              private router: Router,
              private route: ActivatedRoute) { }

  loadCourses(title?: string, end?: number) {
     this.getCourses(title, end)
       .subscribe((courses: Course[]) => this.courseSubject.next(courses));
  }

  removeCourseById(id: string) {
     this.deleteCourse(id).pipe(
      switchMap(() => this.getCourses()),
    ).subscribe((courses: Course[]) => this.courseSubject.next(courses));
  }

  private getCourses(title?: string, end?: number): Observable<Course[]> {
    return this.courseApiService.getCourses(title, end);
  }

  private deleteCourse(id: string): Observable<{}> {
    return this.courseApiService.deleteCourse(id);
  }

  postCourse(course: Course) {
     this.courseApiService.postCourse(course).pipe(
      tap(() => {
        this.router.navigate(['../'], {relativeTo: this.route});
      })
    ).subscribe();
  }

  editCourse(course: Course) {
    return this.courseApiService.editCourse(course).pipe(
      tap(() => {
        this.router.navigate(['../'], {relativeTo: this.route});
      })
    ).subscribe();
  }

  navigateById(id: string) {
    this.router.navigate([`/courses/${id}`]);
  }

  getCourseById(id: string) {
    return this.courseApiService.getCourse(id);
  }
}


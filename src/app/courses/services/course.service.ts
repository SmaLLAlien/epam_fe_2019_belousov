import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {Course} from '../../core/models/course.model';
import {CourseApiService} from '../../core/services/course.api-service';

@Injectable()
export class CourseService {

  constructor(private courseApiService: CourseApiService) { }

  getCourses(): Observable<Course[]> {
    return this.courseApiService.getCourses();
  }

  deleteCourse(id: number): Observable<{}> {
    return this.courseApiService.deleteCourse(id);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Course} from '../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseApiService {
  BASE_URL = 'http://localhost:3000';
  url = 'courses';

  error: string;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.BASE_URL}/${this.url}`);
  }

  deleteCourse(id: number): Observable<{}> {
    return this.http.delete(`${this.BASE_URL}/${this.url}/${id}`);
  }
}

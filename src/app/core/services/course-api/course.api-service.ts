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
  end = 3;


  constructor(private http: HttpClient) {
  }

  getCourses(title?: string, end?: number): Observable<Course[]> {
    if (title) {
      return this.http.get<Course[]>(`${this.BASE_URL}/${this.url}`, {params: {title_like: `${title}`}});
    }
    if (end) {
      return this.http.get<Course[]>(`${this.BASE_URL}/${this.url}`, {params: {_start: '0', _end: `${++this.end}`}});
    }
    return this.http.get<Course[]>(`${this.BASE_URL}/${this.url}`, {params: {_start: '0', _end: `${this.end}`}});
  }

  postCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.BASE_URL}/${this.url}`, course);
  }

  editCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.BASE_URL}/${this.url}/${course.id}`, course);
  }

  deleteCourse(id: string): Observable<{}> {
    return this.http.delete(`${this.BASE_URL}/${this.url}/${id}`);
  }

  getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.BASE_URL}/${this.url}/${id}`);
  }
}

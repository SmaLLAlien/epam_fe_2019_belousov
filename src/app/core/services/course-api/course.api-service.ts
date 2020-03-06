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

  constructor(private http: HttpClient) {
  }

  getCourses(title?: string): Observable<Course[]> {
    if (title) {
      return this.http.get<Course[]>(`${this.BASE_URL}/${this.url}`, {params: {title_like: `${title}`}});
    }
    return this.http.get<Course[]>(`${this.BASE_URL}/${this.url}`);
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

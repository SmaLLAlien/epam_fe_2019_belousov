import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';

import {Course} from '../models/course.model';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseApiService {
  BASE_URL = 'http://localhost:3000';
  url = 'courses';

  error: string;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.BASE_URL}/${this.url}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteCourse(id: number): Observable<{}> {
    return this.http.delete(`${this.BASE_URL}/${this.url}/${id}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}

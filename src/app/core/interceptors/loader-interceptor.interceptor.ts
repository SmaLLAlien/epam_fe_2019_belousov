import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpEventType, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {LoaderService} from '../services/loader/loader.service';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class LoaderInterceptorInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(request).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          this.loaderService.hide();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.loaderService.hide();
        return this.handleError(error);
      })
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

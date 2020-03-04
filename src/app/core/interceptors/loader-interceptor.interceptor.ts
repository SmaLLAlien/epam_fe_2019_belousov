import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpEventType, HttpErrorResponse
} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {LoaderService} from '../services/loader/loader.service';
import {catchError, retry, tap} from 'rxjs/operators';
import {ErrorDialogService} from '../services/error-dialog/error-dialog.service';

@Injectable()
export class LoaderInterceptorInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService, private errorDialogService: ErrorDialogService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(request).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          this.loaderService.hide();
        }
      }),
      retry(1),
      catchError((error: HttpErrorResponse) => {
        this.loaderService.hide();
        this.errorDialogService.openDialog(error);
        return EMPTY;
      })
    );
  }
}

import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Error} from '../../models/error.model';


@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {
  private errorInfo: Error;
  private errorSubject = new Subject<Error>();
  errorSend = this.errorSubject.asObservable();

  constructor() { }

  openDialog(error) {
    this.errorInfo = {
      reason: error.message,
      status: error.status
    };
    this.errorSubject.next(this.errorInfo);
  }

  closeDialog() {
    this.errorInfo = null;
    this.errorSubject.next(this.errorInfo);
  }

}

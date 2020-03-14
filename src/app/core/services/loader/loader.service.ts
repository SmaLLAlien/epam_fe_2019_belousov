import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject: Subject<boolean> = new Subject();
  loader: Observable<boolean> = this.loaderSubject.asObservable();

  show() {
    this.loaderSubject.next(true);
  }

  hide() {
    this.loaderSubject.next(false);
  }
}

import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  searchControl = new FormControl();
  @Output() userSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap((inputData: string) => this.userSearch.emit(inputData))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

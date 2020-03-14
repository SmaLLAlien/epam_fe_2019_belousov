import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { SearchComponent } from './search.component';
import {fromEvent} from "rxjs";
import {By} from "@angular/platform-browser";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SearchComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should  emit search input', (done: DoneFn) => {
    let event;
    component.userSearch.subscribe(val => event = val);
    let input = fixture.debugElement.query(By.css('.search__field'));
    let el = input.nativeElement;
    component.searchControl.valueChanges.subscribe(inputData => {
      expect(inputData).toBe('search');
      component.userSearch.emit(inputData);
      done();
    });
    component.searchControl.setValue('search');
    fromEvent(el, 'input');
    fixture.detectChanges();
  });
});

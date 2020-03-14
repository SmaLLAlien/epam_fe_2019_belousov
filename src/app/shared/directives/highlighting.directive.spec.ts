import { HighlightDirective } from './highlighting.directive';
import {Component, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

@Component({
  template: `<div appHighlight [courseDate]="componentDate"></div>`
})
class TestComponent {
  @ViewChild(HighlightDirective) directive: HighlightDirective;
  componentDate = '03/10/2020';
}

@Component({
  template: `<div appHighlight [courseDate]="componentDate"></div>`
})
class TestLongDateComponent {
  @ViewChild(HighlightDirective) directive: HighlightDirective;
  componentDate = '03/02/2019';
}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let fixtureLongDate: ComponentFixture<TestLongDateComponent>;
  let component: TestComponent;
  let componentLongDate: TestLongDateComponent;
  let inputEl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        TestLongDateComponent,
        HighlightDirective
      ]
    }).compileComponents();

  }));

  describe('closeDate', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should has class course__highlight',  () => {
      inputEl = fixture.debugElement.query(By.directive(HighlightDirective)).nativeElement;
      fixture.detectChanges();
      expect(inputEl.classList[0]).toBe('course__highlight');
    });

  });

  describe('longDate', () => {
    beforeEach(() => {
      fixtureLongDate = TestBed.createComponent(TestLongDateComponent);
      componentLongDate = fixtureLongDate.componentInstance;
      fixtureLongDate.detectChanges();
    });

    it('should not has class course__highlight',  () => {
      const inputEl1 = fixtureLongDate.debugElement.query(By.directive(HighlightDirective)).nativeElement;
      fixtureLongDate.detectChanges();

      expect(inputEl1.classList[0]).not.toBe('course__highlight');
    });
  });


});

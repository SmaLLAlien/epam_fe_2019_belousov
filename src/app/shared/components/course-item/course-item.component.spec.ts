import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import {ToHoursPipe} from "../../pipes/to-hours.pipe";
import {HighlightDirective} from "../../directives/highlighting.directive";
import {By} from "@angular/platform-browser";

const courseMock = {
  id: '1',
  title: 'title',
  description: 'description',
  time: '200',
  date: '02/02/2022',
  author: 'author'
};

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseItemComponent, ToHoursPipe, HighlightDirective ],
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.course = courseMock;
    fixture.detectChanges();
  });

  it('should create CourseItemComponent', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have correct bindings',  () => {
    const courseHeaderElem = fixture.debugElement.query(By.css('.course__header'));
    const courseTimeElem = fixture.debugElement.query(By.css('.course__time'));
    const courseDateElem = fixture.debugElement.query(By.css('.course__date'));
    const courseDescElem = fixture.debugElement.query(By.css('.course__text'));

    const time = (new ToHoursPipe()).transform(courseMock.time);

    expect(courseHeaderElem.nativeElement.textContent.trim()).toBe(courseMock.title);
    expect(courseTimeElem.nativeElement.textContent.trim()).toBe(time);
    expect(courseDateElem.nativeElement.textContent.trim()).toBe(courseMock.date);
    expect(courseDescElem.nativeElement.textContent.trim()).toBe(courseMock.description);
  });

  it('should emit course.id after click onEdit',  () => {
    const courseEditElem = fixture.debugElement.query(By.css('.course__edit'));
    let event;
    component.edited.subscribe(val => event = val);
    courseEditElem.triggerEventHandler('click', null);

    expect(event).toBe(courseMock.id);
  });

  it('should emit course.id after click onDelete',  () => {
    const courseDeleteElem = fixture.debugElement.query(By.css('.course__delete'));
    let event;
    component.deleted.subscribe(val => event = val);
    courseDeleteElem.triggerEventHandler('click', null);

    expect(event).toBe(courseMock.id);
  });
});

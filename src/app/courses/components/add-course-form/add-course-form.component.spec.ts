import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseFormComponent } from './add-course-form.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Course} from '../../../core/models/course.model';

const course: Course = {
  title: 'title',
  description: 'description',
  time: '20',
  date: '02/02/2019',
  author: 'author1',
  id: '2'
};

describe('AddCourseFormComponent', () => {
  let component: AddCourseFormComponent;
  let fixture: ComponentFixture<AddCourseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [ AddCourseFormComponent ],
      providers: [
        FormBuilder
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.courseForm.valid).toBeFalsy();
  });

  it('should submitting a form to emits a course',  () => {
    expect(component.courseForm.valid).toBeFalsy();
    component.courseForm.get('title').setValue('title');
    component.courseForm.get('description').setValue('description');
    component.courseForm.get('time').setValue('20');
    component.courseForm.get('date').setValue('02/02/2019');
    component.courseForm.get('author').setValue('author1');
    expect(component.courseForm.valid).toBeTruthy();
    component.course.subscribe(data => {
      expect(data).toEqual(course);
    });

    component.id = '2';

    component.submit();
  });

  it('should get item',  () => {
    component.item = course;
    expect(component.id).toBe(course.id);
    expect(component.allowEdit).toBe(true);

    component.courseForm.patchValue({
      title: course.title
    });

    expect(component.courseForm.get('title').value).toBe('title');
  });
});

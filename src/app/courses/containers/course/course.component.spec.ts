import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseComponent } from './course.component';
import {CourseService} from '../../services/course.service';
import {Course} from '../../../core/models/course.model';
import SpyObj = jasmine.SpyObj;
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

const courseServiceMethods = ['postCourse', 'editCourse', 'getCourseById'];

const course: Course = {
  title: 'title',
  description: 'description',
  time: '2',
  date: '03/13/2020',
  author: 'Author1',
  id: '2'
};

describe('CourseComponent', () => {

  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  let courseService: SpyObj<CourseService>;
  let route;
  let router;

  beforeEach(async(() => {
    courseService = jasmine.createSpyObj('CourseService', courseServiceMethods);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ CourseComponent ],
      providers: [
        {provide: CourseService, useValue: courseService},
        {provide: ActivatedRoute, useValue: {params: of({id: 1})}}
        ]
    })
    .compileComponents();
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sendCourse()', () => {
    it('should call editCourse()',  async () => {
      component.ngOnInit();
      const edit = spyOn(component, 'editCourse');
      component.sendCourse(course);
      fixture.detectChanges();
      expect(edit).toHaveBeenCalled();
    });

    it('should not call editCourse()',  async () => {
      TestBed.inject(ActivatedRoute).params = of({ id: null });
      component.ngOnInit();
      const edit = spyOn(component, 'editCourse');
      component.sendCourse(course);
      fixture.detectChanges();
      expect(edit).not.toHaveBeenCalled();
    });
  });

  describe('editCourse', () => {
    it('should ',  () => {
      component.editCourse(course);

      expect(courseService.editCourse).toHaveBeenCalled();
    });
  });
});

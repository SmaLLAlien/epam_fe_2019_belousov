import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import {ErrorDialogService} from '../../../core/services/error-dialog/error-dialog.service';
import {CourseService} from '../../services/course.service';
import SpyObj = jasmine.SpyObj;
import {SearchComponent} from '../../components/search/search.component';

const courseServiceMethods = [
  'loadCourses',
  'postCourse',
  'editCourse',
  'getCourseById',
  'removeCourseById',
  'navigateById'];

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let courseService: SpyObj<CourseService>;
  let errorDialogService: ErrorDialogService;

  beforeEach(async(() => {
    courseService = jasmine.createSpyObj('CourseService', courseServiceMethods);
    TestBed.configureTestingModule({
      declarations: [ CoursesComponent, SearchComponent ],
      providers: [
        ErrorDialogService,
        {provide: CourseService, useValue: courseService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    errorDialogService = TestBed.inject(ErrorDialogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDelete()', () => {
    it('should call removeCourseById()',  () => {
      component.onDelete('2');

      expect(courseService.removeCourseById).toHaveBeenCalled();
    });
  });

  describe('onEdit()', () => {
    it('should call navigateById()',  () => {
      component.onEdit('2');

      expect(courseService.navigateById).toHaveBeenCalled();
    });
  });

  describe('loadMore()', () => {
    it('should call loadCourses()',  () => {
      component.loadMore();

      expect(courseService.loadCourses).toHaveBeenCalled();
    });
  });

  describe('findCourseFromSearch()', () => {
    it('should call loadCourses()',  () => {
      component.findCourseFromSearch('search');

      expect(courseService.loadCourses).toHaveBeenCalled();
      expect(courseService.loadCourses).toHaveBeenCalledWith('search');
    });
  });

  // describe('closeError()', () => {
  //   it('should call closeDialog()',  () => {
  //     component.closeError();
  //
  //     const close = spyOn(errorDialogService, 'closeDialog');
  //     expect(close).toHaveBeenCalled();
  //   });
  // });
});

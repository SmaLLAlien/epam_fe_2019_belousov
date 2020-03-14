import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import {CourseApiService} from '../../core/services/course-api/course.api-service';
import {RouterTestingModule} from '@angular/router/testing';
import SpyObj = jasmine.SpyObj;
import {of} from 'rxjs';
import {Course} from '../../core/models/course.model';
import {Router} from '@angular/router';

const apiMethods = ['getCourses', 'postCourse', 'editCourse', 'deleteCourse', 'getCourse'];
const course: Course = {
    title: 'Titleee',
    description: 'dsdf',
    time: '2',
    date: '03/13/2020',
    author: 'Author1',
  };

describe('CourseService', () => {
  let service: CourseService;
  let apiService: SpyObj<CourseApiService>;
  let router: Router;


  beforeEach(() => {
    apiService = jasmine.createSpyObj('CourseApiService', apiMethods);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        CourseService,
        {
        provide: CourseApiService,
        useValue: apiService
        }
        ]
    });
    service = TestBed.inject(CourseService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('removeCourseById()', () => {
    it('should call getCourses',  () => {
      spyOn(service, 'getCourses' as any).and.returnValue([{}]);
      apiService.deleteCourse.and.returnValue(of({}));

      service.removeCourseById('2');

    // tslint:disable-next-line
      expect(service['getCourses']).toHaveBeenCalled();
    });
  });

  describe('loadCourses()', () => {
    it('should call getCourses',  () => {
      spyOn(service, 'getCourses' as any).and.returnValue(of([{}]));
      apiService.getCourses.and.returnValue(of([course]));
      service.loadCourses();

      // tslint:disable-next-line
      expect(service['getCourses']).toHaveBeenCalled();
    });
  });

  describe('getCourses()', () => {
    it('should call api getCourses',  () => {
      // tslint:disable-next-line
      service['getCourses']();

      expect(apiService.getCourses).toHaveBeenCalled();
    });
  });

  describe('postCourse()', () => {
    it('should call api postCourse',  () => {
      apiService.postCourse.and.returnValue(of(course));
      // tslint:disable-next-line
      service.postCourse(course);

      expect(apiService.postCourse).toHaveBeenCalled();
    });
  });

  describe('editCourse()', () => {
    it('should call api editCourse',  () => {
      apiService.editCourse.and.returnValue(of(course));
      // tslint:disable-next-line
      service.editCourse(course);

      expect(apiService.editCourse).toHaveBeenCalled();
    });
  });

  describe('navigateById()', () => {
    it('should navigate to /courses/2',  () => {
      const navigateSpy = spyOn(router, 'navigate');

      service.navigateById('2');
      expect(navigateSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/courses/2']);
    });
  });

  describe('getCourseById()', () => {
    it('should call api getCourse',  () => {

      // tslint:disable-next-line
      service.getCourseById('2');

      expect(apiService.getCourse).toHaveBeenCalled();
    });
  });
});

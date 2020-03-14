import { TestBed } from '@angular/core/testing';

import { CourseApiService } from './course.api-service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Course} from '../../models/course.model';

const course: Course = {
  title: 'title',
  description: 'description',
  time: '2',
  date: '03/13/2020',
  author: 'Author1',
  id: '2'
};

describe('CourseApiService', () => {
  let service: CourseApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseApiService,
      ],
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(CourseApiService);
    httpMock  = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCourse()', () => {
    it('should get one course',  () => {
      service.getCourse('2').subscribe((data: Course) => {
        expect(data).toEqual(course);
      });

      const req = httpMock.expectOne(`http://localhost:3000/courses/2`);
      expect(req.request.method).toBe('GET');

      req.flush(course);

      httpMock.verify();
    });
  });

  describe('editCourse()', () => {
    it('should edit course',  () => {
      service.editCourse(course).subscribe((data: Course) => {
        expect(data).toEqual(course);
      });

      const req = httpMock.expectOne(`http://localhost:3000/courses/2`);
      expect(req.request.method).toBe('PUT');

      req.flush(course);
      httpMock.verify();
    });
  });

  describe('deleteCourse()', () => {
    it('should ',  () => {
      service.deleteCourse('2').subscribe((data: Course) => {
        expect(data).toEqual(course);
      });

      const req = httpMock.expectOne(`http://localhost:3000/courses/2`);
      expect(req.request.method).toBe('DELETE');

      req.flush(course);
      httpMock.verify();
    });
  });

  describe('getCourses()', () => {
    it('should get all courses',  () => {
      service.getCourses().subscribe((data: Course[]) => {
        expect(data[0]).toEqual(course);
      });

      const req = httpMock.expectOne({method: 'GET', url: `http://localhost:3000/courses?_start=0&_end=3`});
      expect(req.request.method).toBe('GET');

      req.flush([course]);
      httpMock.verify();
    });

    it('should get courses by title',  () => {
      const title = 'title';
      service.getCourses(title).subscribe((data: Course[]) => {
        expect(data[0]).toEqual(course);
      });

      const req = httpMock.expectOne({method: 'GET', url: `http://localhost:3000/courses?title_like=${title}`});
      expect(req.request.method).toBe('GET');

      req.flush([course]);
      httpMock.verify();
    });

    it('should get next courses',  () => {
      const end = 3;
      service.getCourses(null, end).subscribe((data: Course[]) => {
        expect(data[0]).toEqual(course);
      });

      const req = httpMock.expectOne({method: 'GET', url: `http://localhost:3000/courses?_start=0&_end=${end}`});
      expect(req.request.method).toBe('GET');

      req.flush([course]);
      httpMock.verify();
    });
  });

  describe('postCourse()', () => {
    it('should post course',  () => {
      service.postCourse(course).subscribe((data: Course) => {
        expect(data).toEqual(course);
      });

      const req = httpMock.expectOne(`http://localhost:3000/courses`);
      expect(req.request.method).toBe('POST');

      req.flush(course);
      httpMock.verify();
    });
  });
});

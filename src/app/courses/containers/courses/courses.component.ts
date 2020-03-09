import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {tap} from 'rxjs/operators';

import {Course} from '../../../core/models/course.model';
import {CourseService} from '../../services/course.service';
import {ErrorDialogService} from '../../../core/services/error-dialog/error-dialog.service';
import {Error} from '../../../core/models/error.model';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit {
  courses: Observable<Course[]>;
  error: Observable<Error>;

  constructor(private courseService: CourseService, private errorDialogService: ErrorDialogService) {
    this.courseService.loadCourses();
  }

  ngOnInit(): void {
    this.courses = this.courseService.course;

    this.error = this.errorDialogService.errorSend;
  }

  onDelete(id: string) {
    this.courseService.removeCourseById(id);

    this.courses = this.courseService.course;
  }

  closeError() {
    this.errorDialogService.closeDialog();
  }

  onEdit(id: string) {
    this.courseService.navigateById(id);
  }

  findCourseFromSearch(inputData: string) {
    this.courseService.loadCourses(inputData);
    this.courses = this.courseService.course;
  }

  loadMore() {
    this.courseService.loadCourses(null, 1);
    this.courses = this.courseService.course;
  }
}



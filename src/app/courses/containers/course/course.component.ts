import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Course} from '../../../core/models/course.model';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute, Params} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {
  id: string;
  course: Observable<Course>;

  constructor(private courseService: CourseService,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.id = params.id);

    if (this.id) {
      this.course = this.courseService.getCourseById(this.id);
    }
  }

  sendCourse(course: Course) {
    if (this.id) {
      this.editCourse(course);
    } else {
      this.courseService.postCourse(course).subscribe();
    }
  }

  editCourse(course: Course) {
    this.courseService.editCourse(course).subscribe();
  }
}

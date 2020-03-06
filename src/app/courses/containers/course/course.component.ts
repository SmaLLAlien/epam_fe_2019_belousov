import { Component, OnInit } from '@angular/core';
import {Course} from '../../../core/models/course.model';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute, Params} from '@angular/router';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  id: string;
  course: Course;

  constructor(private courseService: CourseService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.id = params.id);

    if (this.id) {
      this.getCourse();
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

  getCourse(): void {
    this.courseService.getCourseById(this.id).pipe(
      tap((course: Course) => this.course = course)
    ).subscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import {switchMap} from "rxjs/operators";

import {Course} from "../../../core/models/course.model";
import {CourseService} from "../../services/course.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[];
  error: string;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      courses => {
      this.courses = courses;
    },
      error => this.error = 'Request is failure, please try again later')
  }

  onDelete(id: number) {
    this.courseService.deleteCourse(id).pipe(
      switchMap(() => this.courseService.getCourses())
    ).subscribe(
      course => this.courses = course,
      error => this.error = 'Request is failure, please try again later');
  }

  onErrorHandle() {
    this.error = null;
  }
}

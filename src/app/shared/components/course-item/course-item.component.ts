import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../../../core/models/course.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  @Input() course: Course;
  @Output() deleted = new EventEmitter<string>();
  @Output() edited = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  onDelete() {
    this.deleted.emit(this.course.id);
  }

  onEdit() {
    this.edited.emit(this.course.id);
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Course} from '../../../core/models/course.model';
import {durationValidator} from '../../../core/Validators/range.validator';
import {dateValidator} from '../../../core/Validators/date.validator';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.scss']
})
export class AddCourseFormComponent implements OnInit, AfterViewInit  {
  @Input() set item(course: Course) {
    if (course && course.id) {
      this.allowEdit = true;
      this.id = course.id;
      this.courseForm.patchValue(course);
    }
  }
  @Output() course: EventEmitter<Course> = new EventEmitter<Course>();
  @ViewChild('dateField') dateInput: ElementRef;

  allowEdit = false;
  id: string;

  courseForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(50)]],
    time: ['', [Validators.required, durationValidator(1, 600)]],
    date: ['', [Validators.required, dateValidator]],
    author: ['', Validators.required]
  });

  get title() {
    return this.courseForm.get('title');
  }

  get description() {
    return this.courseForm.get('description');
  }

  get time() {
    return this.courseForm.get('time');
  }

  get date() {
    return this.courseForm.get('date');
  }

  get author() {
    return this.courseForm.get('author');
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dateInput.nativeElement.value = '12/22/2020';
  }


  submit() {
    const id = this.id;
    this.course.emit({id, ...this.courseForm.value});
  }
}

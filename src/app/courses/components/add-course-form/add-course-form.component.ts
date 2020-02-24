import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.scss']
})
export class AddCourseFormComponent implements OnInit, AfterViewInit {
  @ViewChild('dateField') dateInput: ElementRef;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dateInput.nativeElement.value = '2017-06-01';
  }

}

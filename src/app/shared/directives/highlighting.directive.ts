import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input() courseDate: string;
  hoursInDay = 24;
  minutesInHour = 60;
  secondsInMinute = 60;
  mSecInSec = 1000;

  constructor(private element: ElementRef) {

  }

  ngOnInit(): void {
    const dateDiff = Math.abs(Date.now() - Date.parse(this.courseDate));
    if ((dateDiff / (this.hoursInDay * this.minutesInHour * this.secondsInMinute * this.mSecInSec)) < 14) {
      this.element.nativeElement.classList.add('course__highlight');
    }
  }

}

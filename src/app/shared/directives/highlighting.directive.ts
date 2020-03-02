import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input() courseDate: string;
  hoursInDay = 24;
  minutesInHour = 60;
  secondsInMinute = 60;
  mSecInSec = 1000;

  constructor(private element: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit(): void {
    const dateDiff = Date.now() - Date.parse(this.courseDate);
    if ((dateDiff / (this.hoursInDay * this.minutesInHour * this.secondsInMinute * this.mSecInSec)) < 14) {
      this.renderer.setStyle(this.element.nativeElement, 'border', '3px solid #627C85');
    }
  }

}

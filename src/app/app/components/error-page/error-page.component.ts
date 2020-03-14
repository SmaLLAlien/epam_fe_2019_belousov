import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorPageComponent implements AfterViewInit, OnDestroy  {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'rgb(0, 0, 0)';
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '';
  }

}

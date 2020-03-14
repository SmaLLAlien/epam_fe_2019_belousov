import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDialogComponent } from './error-dialog.component';
import {By} from '@angular/platform-browser';

describe('ErrorDialogComponent', () => {
  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
    component.error = {reason: 'reason', status: 'status'};
    fixture.detectChanges();
  });

  it('should create ErrorDialogComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event when clicking on the button', () => {
    fixture.detectChanges();
    const closeBtn = fixture.debugElement.query(By.css('.error__button'));
    let event;
    component.closeDialog.subscribe(val => event = val);
    closeBtn.triggerEventHandler('click', null);

    expect(event).toBeTruthy();
  });

  afterAll(() => {
    fixture.detectChanges();
    fixture.destroy();
    fixture.debugElement.nativeElement.remove();
  });
});

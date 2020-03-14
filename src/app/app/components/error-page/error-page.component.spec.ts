import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPageComponent } from './error-page.component';


describe('ErrorComponent', () => {
  let fixture: ComponentFixture<ErrorPageComponent>;
  let component: ErrorPageComponent;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create ErrorComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should make body background black', () => {

    const body = fixture.nativeElement.ownerDocument.body;
    const backgroundColor = getComputedStyle(body).getPropertyValue('background-color');

    expect(backgroundColor).toBe('rgb(0, 0, 0)');
  });

  it('should clear body background', () => {
    component.ngOnDestroy();
    const body = fixture.nativeElement.ownerDocument.body;
    const backgroundColor = getComputedStyle(body).getPropertyValue('background-color');

    expect(backgroundColor).toBe('rgb(211, 211, 211)');
  });
});

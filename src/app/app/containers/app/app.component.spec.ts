import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {LoaderService} from '../../../core/services/loader/loader.service';
import {By} from '@angular/platform-browser';
import {LoaderComponent} from '../../components/loader/loader.component';
import {HeaderComponent} from '../../components/header/header.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {LogoComponent} from '../../components/logo/logo.component';
import {NavigationComponent} from '../../components/navigation/navigation.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        LoaderComponent,
        HeaderComponent,
        FooterComponent,
        LogoComponent,
        NavigationComponent
      ],
      providers: [LoaderService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should show loader when subscription true',  async () => {
    const loaderService = TestBed.inject(LoaderService);
    loaderService.show();

    fixture.detectChanges();
    const loaderEl = fixture.debugElement.query(By.css('app-loader'));
    expect(loaderEl).toBeTruthy();
  });

  it('should hide loader when subscription false',  async () => {
    const loaderService = TestBed.inject(LoaderService);
    loaderService.hide();

    fixture.detectChanges();
    const loaderEl = fixture.debugElement.query(By.css('app-loader'));
    expect(loaderEl).toBeFalsy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LoaderInterceptorInterceptor } from './loader-interceptor.interceptor';
import {LoaderService} from '../services/loader/loader.service';
import {ErrorDialogService} from '../services/error-dialog/error-dialog.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';

describe('LoaderInterceptorInterceptor', () => {
  let errorDIalogService: ErrorDialogService;
  let loaderService: LoaderService;
  let httpMock: HttpTestingController;
  let interceptor: LoaderInterceptorInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoaderInterceptorInterceptor,
        LoaderService,
        ErrorDialogService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptorInterceptor,
          multi: true
        }
      ]
    });
    errorDIalogService = TestBed.inject(ErrorDialogService);
    loaderService = TestBed.inject(LoaderService);
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(LoaderInterceptorInterceptor);
    });


  it('should be created', () => {
    const interceptor: LoaderInterceptorInterceptor = TestBed.inject(LoaderInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should get response',  () => {
    const show = spyOn(loaderService, 'show');
    const hide = spyOn(loaderService, 'hide');
    const http = TestBed.inject(HttpClient);

    http.get('/api').subscribe(response => {
      expect(show).toHaveBeenCalled();
      expect(response).toBeTruthy();
      expect(hide).toHaveBeenCalled();

    });
    const req = httpMock.expectOne('/api');
    req.flush({ title: 'title' });
    httpMock.verify();
  });

});

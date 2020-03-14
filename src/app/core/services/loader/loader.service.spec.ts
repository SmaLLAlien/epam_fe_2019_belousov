import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    loaderService = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(loaderService).toBeTruthy();
  });

  it('should emit true', (done: DoneFn) => {

    loaderService.loader.subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });
    loaderService.show();
  });

  it('should emit false', (done: DoneFn) => {

    loaderService.loader.subscribe((data) => {
      expect(data).toBeFalsy();
      done();
    });

    loaderService.hide();
  });
});

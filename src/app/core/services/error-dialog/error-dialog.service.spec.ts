import { TestBed } from '@angular/core/testing';

import { ErrorDialogService } from './error-dialog.service';

const errorInfoMock = {
  reason: 'reason',
  status: 'status'
};

const errorInput = {
  message: 'reason',
  status: 'status'
};

describe('ErrorDialogService', () => {
  let service: ErrorDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorDialogService);
  });

  it('should be created ErrorDialogService', () => {
    expect(service).toBeTruthy();
  });


  it('should produce error',  (done: DoneFn) => {
    service.errorSend.subscribe(error => {
        expect(error).toEqual(errorInfoMock);
        done();
    });
    service.openDialog(errorInput);
  });

  it('should  produce null',  (done: DoneFn) => {

    service.errorSend.subscribe(error => {
      expect(error).toBeNull();
      done();
    });
    service.closeDialog();
  });
});

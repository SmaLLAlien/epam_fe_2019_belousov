import { dateValidator } from './date.validator';
import {FormControl} from '@angular/forms';

describe('dateValidator', () => {
  let control;

  beforeEach(() => {
    control = new FormControl('input');
  });

  it('should pass date validator with correct date',  () => {
    control.setValue('12/22/1990');

    expect(dateValidator(control)).toEqual(null);
  });

  it('should not pass date validator with incorrect year',  () => {
    control.setValue('12/22/199');

    expect(dateValidator(control)).toEqual({date: true});
  });

  it('should not pass date validator with incorrect day',  () => {
    control.setValue('12/220/1990');

    expect(dateValidator(control)).toEqual({date: true});
  });

  it('should not pass date validator with incorrect month',  () => {
    control.setValue('13/220/1990');

    expect(dateValidator(control)).toEqual({date: true});
  });
})

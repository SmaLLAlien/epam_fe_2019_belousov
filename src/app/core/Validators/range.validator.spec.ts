import { durationValidator } from './range.validator';
import {FormControl} from '@angular/forms';

describe('durationValidator', () => {
  let min;
  let max;
  let testValue;
  let control;

  beforeEach(() => {
    min = 1;
    max = 600;
    control = new FormControl('input');
  });

  it('should pass range validator',  () => {
    testValue = 300;
    const rangeValidator = durationValidator(min, max);
    control.setValue(200);

    expect(rangeValidator(control)).toEqual(null);
  });

  it('should not pass range validator with max less then form value',  () => {
    testValue = 300;
    const rangeValidator = durationValidator(min, max);
    control.setValue(900);

    expect(rangeValidator(control)).toEqual({range: true});
  });

  it('should not pass range validator with min greater then form value',  () => {
    testValue = 300;
    const rangeValidator = durationValidator(min, max);
    control.setValue(900);

    expect(rangeValidator(control)).toEqual({range: true});
  });
})

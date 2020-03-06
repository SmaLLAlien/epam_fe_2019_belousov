import {AbstractControl} from '@angular/forms';

export function dateValidator(control: AbstractControl): {date: true} | null {
  if (control.value !== undefined && (isNaN(control.value))
    && control.value.length === 10 && Date.parse(control.value)) {
    return null;
  }
  return {date: true};
}

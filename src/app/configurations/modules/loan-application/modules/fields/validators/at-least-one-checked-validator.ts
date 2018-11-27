import { FormArray } from '@angular/forms';

export class AtLeastOneCheckedValidator {
  static createValidator(min = 1) {
    return (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => (next ? prev + next : prev), 0);
      return totalSelected >= min ? null : { atLeastOneChecked: true };
    };
  }
}

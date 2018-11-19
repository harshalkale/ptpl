import { LoanApplicationTypeService } from '../../../../../../shared/services/loan-application-type/loan-application-type.service';
import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

export class IsNameTakenValidator {
  static createValidator(service: LoanApplicationTypeService, except = '') {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }
      return service.isNameTaken(control.value).pipe(
        map(res => {
          return !res.length
            ? null
            : res.length === 1 && res[0] && res[0].name === except
              ? null
              : { isTaken: true };
        })
      );
    };
  }
}

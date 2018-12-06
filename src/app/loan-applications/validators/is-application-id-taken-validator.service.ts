import { LoanApplicationService } from '../../shared/services/loan-application/loan-application.service';
import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

export class IsApplicationIdTakenValidator {
  static createValidator(service: LoanApplicationService, except = '') {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }
      return service.isApplicationIdTaken(control.value).pipe(
        map(res => {
          return !res.length
            ? null
            : res.length === 1 && res[0] && res[0].applicationId === except
              ? null
              : { isTaken: true };
        })
      );
    };
  }
}

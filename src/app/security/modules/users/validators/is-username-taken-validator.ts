import { UserService } from '../../../../shared/services/user/user.service';
import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

export class IsUsernameTakenValidator {
  static createValidator(service: UserService, except = '') {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }
      return service.isUsernameTaken(control.value).pipe(
        map(res => {
          return !res.length
            ? null
            : res.length === 1 &&
              res[0] &&
              res[0].auth &&
              res[0].auth.username === except
            ? null
            : { isTaken: true };
        })
      );
    };
  }
}

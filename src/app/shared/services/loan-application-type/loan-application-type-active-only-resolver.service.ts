import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from '@angular/router';
import { LoanApplicationType } from '../../models/loan-application-type';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { LoanApplicationTypeService } from './loan-application-type.service';

@Injectable({
  providedIn: 'root'
})
export class LoanApplicationTypeActiveOnlyResolverService
  implements Resolve<LoanApplicationType[]> {
  constructor(
    private service: LoanApplicationTypeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<LoanApplicationType[]> | Observable<never> {
    return this.service.filter({ active: true }).pipe(
      mergeMap(loanApplicationTypes => {
        if (loanApplicationTypes.length) {
          return of(loanApplicationTypes);
        } else {
          this.router.navigate(['../list'], {
            relativeTo: this.activatedRoute
          });
          return EMPTY;
        }
      })
    );
  }
}

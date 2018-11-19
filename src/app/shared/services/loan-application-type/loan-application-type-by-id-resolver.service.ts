import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { LoanApplicationType } from '../../models/loan-application-type';
import { LoanApplicationTypeService } from './loan-application-type.service';

@Injectable({
  providedIn: 'root'
})
export class LoanApplicationTypeByIdResolverService
  implements Resolve<LoanApplicationType> {
  constructor(
    private service: LoanApplicationTypeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<LoanApplicationType> | Observable<never> {
    const id = route.paramMap.get('id');
    return this.service.findById(id).pipe(
      take(1),
      mergeMap(loanApplicationType => {
        if (loanApplicationType[0]) {
          return of(loanApplicationType[0]);
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

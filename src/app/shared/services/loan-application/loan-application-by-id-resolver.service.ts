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
import { LoanApplication } from '../../models/loan-application';
import { LoanApplicationService } from './loan-application.service';

@Injectable({
  providedIn: 'root'
})
export class LoanApplicationByIdResolverService implements Resolve<LoanApplication> {
  constructor(
    private service: LoanApplicationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<LoanApplication> | Observable<never> {
    const id = route.paramMap.get('id');
    return this.service.findById(id).pipe(
      take(1),
      mergeMap(loanApplication => {
        if (loanApplication[0]) {
          return of(loanApplication[0]);
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

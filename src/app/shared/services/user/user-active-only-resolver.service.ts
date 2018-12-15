import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from '@angular/router';
import { User } from '../../models/user';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserActiveOnlyResolverService implements Resolve<User[]> {
  constructor(
    private service: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User[]> | Observable<never> {
    return this.service.filter({ active: true }).pipe(
      mergeMap(users => {
        // if (users.length) {
        return of(users);
        // } else {
        //   this.router.navigate(['../list'], {
        //     relativeTo: this.activatedRoute
        //   });
        //   return EMPTY;
        // }
      })
    );
  }
}

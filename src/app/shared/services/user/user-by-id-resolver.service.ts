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
import { User } from '../../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserByIdResolverService implements Resolve<User> {
  constructor(
    private service: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> | Observable<never> {
    const id = route.paramMap.get('id');
    return this.service.findById(id).pipe(
      take(1),
      mergeMap(user => {
        if (user[0]) {
          return of(user[0]);
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

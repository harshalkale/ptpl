import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Role } from '../../models/role';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class RoleActiveOnlyResolverService implements Resolve<Role[]> {
  constructor(
    private service: RoleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Role[]> | Observable<never> {
    return this.service.filter({ active: true }).pipe(
      mergeMap(roles => {
        // if (roles.length) {
        return of(roles);
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

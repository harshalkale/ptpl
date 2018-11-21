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
import { Role } from '../../models/role';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class RoleByIdResolverService implements Resolve<Role> {
  constructor(
    private service: RoleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Role> | Observable<never> {
    const id = route.paramMap.get('id');
    return this.service.findById(id).pipe(
      take(1),
      mergeMap(section => {
        if (section[0]) {
          return of(section[0]);
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

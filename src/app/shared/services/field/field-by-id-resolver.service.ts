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
import { Field } from '../../models/field';
import { FieldService } from './field.service';

@Injectable({
  providedIn: 'root'
})
export class FieldByIdResolverService implements Resolve<Field> {
  constructor(
    private service: FieldService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Field> | Observable<never> {
    const id = route.paramMap.get('id');
    return this.service.findById(id).pipe(
      take(1),
      mergeMap(field => {
        if (field[0]) {
          return of(field[0]);
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

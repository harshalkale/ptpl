import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Field } from '../../models/field';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { FieldService } from './field.service';

@Injectable({
  providedIn: 'root'
})
export class FieldActiveOnlyResolverService implements Resolve<Field[]> {
  constructor(
    private service: FieldService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Field[]> | Observable<never> {
    return this.service.filter({ active: true }).pipe(
      mergeMap(fields => {
        // if (fields.length) {
        return of(fields);
        // } else {
        //   this.router.navigate(['../list'], {
        //     relativeTo: this.activatedRoute
        //   });
        // return EMPTY;
        // }
      })
    );
  }
}

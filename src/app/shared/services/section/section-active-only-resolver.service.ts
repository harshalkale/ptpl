import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Section } from '../../models/section';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { SectionService } from './section.service';

@Injectable({
  providedIn: 'root'
})
export class SectionActiveOnlyResolverService implements Resolve<Section[]> {
  constructor(
    private service: SectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Section[]> | Observable<never> {
    return this.service.filter({ active: true }).pipe(
      mergeMap(sections => {
        // if (sections.length) {
        return of(sections);
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

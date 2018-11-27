import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const that = this;
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          that.authenticationService.logout();
          if (that.router.url.split('/')[1].split('?')[0] !== 'login') {
            location.reload(true);
          }
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}

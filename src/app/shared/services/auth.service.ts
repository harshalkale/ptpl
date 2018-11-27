import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string;
  constructor(private config: ConfigService, private http: HttpClient) {}

  login(username: string, password: string) {
    this.baseUrl = this.config.get('api').baseUrl;
    return this.http
      .post<any>(`${this.baseUrl}auth/login`, { username, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.getItem('currentUser');
          }

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}

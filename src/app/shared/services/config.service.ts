import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _config: any;
  private _env: any;

  constructor(private _http: HttpClient) {}

  /**
   * Loads the environment config file first. Reads the environment variable from the file
   * and based on that loads the appropriate configuration file - development or production
   */
  load() {
    return new Promise(resolve => {
      this._http.get('/configs/environment.json').subscribe((env_data: any) => {
        this._env = env_data;
        this._http
          .get('/configs/config.' + env_data.env + '.json')
          .pipe(
            catchError((error: any) => {
              return Observable.throw(error.json().error || 'Server error');
            })
          )
          .subscribe(data => {
            this._config = data;
            resolve(true);
          });
      });
    });
  }

  /**
   * Returns environment variable based on given key
   *
   * @param key key of the variable
   */
  getEnv(key: any) {
    return this._env[key];
  }

  /**
   * Returns configuration value based on given key
   *
   * @param key key of the variable
   */
  get(key: any) {
    return this._config[key];
  }
}

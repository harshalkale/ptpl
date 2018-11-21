import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { ConfigService } from '../config.service';
import { DataTablesResponse } from '../../models/data-tables-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;
  listUrl: string;
  addUrl: string;
  removeUrl: string;
  updateUrl: string;
  searchUrl: string;
  datatableUrl: string;

  constructor(private config: ConfigService, private http: HttpClient) {
    this.baseUrl = this.config.get('api').baseUrl;
    this.listUrl = `${this.baseUrl}security/users`;
    this.addUrl = `${this.baseUrl}security/users`;
    this.removeUrl = `${this.baseUrl}security/users`;
    this.updateUrl = `${this.baseUrl}security/users`;

    this.searchUrl = `${
      this.baseUrl
    }security/users/search`;
    this.datatableUrl = `${
      this.baseUrl
    }security/users/data-table`;
  }

  getList(): Observable<User[]> {
    return this.http.get<User[]>(this.listUrl);
  }

  filter(searchQuery): Observable<User[]> {
    return this.http.post<User[]>(this.searchUrl, searchQuery);
  }

  findById(id): Observable<User[]> {
    return this.http.post<User[]>(this.searchUrl, { id });
  }

  getDataTable(dataTablesParameters: any): Observable<DataTablesResponse> {
    return this.http.post<DataTablesResponse>(
      this.datatableUrl,
      dataTablesParameters
    );
  }

  isUsernameTaken(username): Observable<User[]> {
    return this.http.post<User[]>(this.searchUrl, { 'auth.username' : username });
  }

  add(data: User): Observable<User> {
    return this.http.post<User>(this.addUrl, data);
  }

  update(data: User): Observable<User> {
    return this.http.put<User>(this.updateUrl, data);
  }

  remove(data: User): Observable<User> {
    return this.http.delete<User>(this.removeUrl + '?id=' + data._id);
  }
}

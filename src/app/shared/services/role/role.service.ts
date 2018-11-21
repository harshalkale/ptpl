import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../../models/role';
import { ConfigService } from '../config.service';
import { DataTablesResponse } from '../../models/data-tables-response';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  baseUrl: string;
  listUrl: string;
  addUrl: string;
  removeUrl: string;
  updateUrl: string;
  searchUrl: string;
  datatableUrl: string;

  constructor(private config: ConfigService, private http: HttpClient) {
    this.baseUrl = this.config.get('api').baseUrl;
    this.listUrl = `${this.baseUrl}security/roles`;
    this.addUrl = `${this.baseUrl}security/roles`;
    this.removeUrl = `${this.baseUrl}security/roles`;
    this.updateUrl = `${this.baseUrl}security/roles`;

    this.searchUrl = `${
      this.baseUrl
    }security/roles/search`;
    this.datatableUrl = `${
      this.baseUrl
    }security/roles/data-table`;
  }

  getList(): Observable<Role[]> {
    return this.http.get<Role[]>(this.listUrl);
  }

  filter(searchQuery): Observable<Role[]> {
    return this.http.post<Role[]>(this.searchUrl, searchQuery);
  }

  findById(id): Observable<Role[]> {
    return this.http.post<Role[]>(this.searchUrl, { id });
  }

  getDataTable(dataTablesParameters: any): Observable<DataTablesResponse> {
    return this.http.post<DataTablesResponse>(
      this.datatableUrl,
      dataTablesParameters
    );
  }

  isNameTaken(name): Observable<Role[]> {
    return this.http.post<Role[]>(this.searchUrl, { name });
  }

  add(data: Role): Observable<Role> {
    return this.http.post<Role>(this.addUrl, data);
  }

  update(data: Role): Observable<Role> {
    return this.http.put<Role>(this.updateUrl, data);
  }

  remove(data: Role): Observable<Role> {
    return this.http.delete<Role>(this.removeUrl + '?id=' + data._id);
  }
}

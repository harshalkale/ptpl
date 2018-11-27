import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field } from '../../models/field';
import { ConfigService } from '../config.service';
import { DataTablesResponse } from '../../models/data-tables-response';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  baseUrl: string;
  listUrl: string;
  addUrl: string;
  removeUrl: string;
  updateUrl: string;
  searchUrl: string;
  datatableUrl: string;

  constructor(private config: ConfigService, private http: HttpClient) {
    this.baseUrl = this.config.get('api').baseUrl;
    this.listUrl = `${this.baseUrl}configurations/loan-application/fields`;
    this.addUrl = `${this.baseUrl}configurations/loan-application/fields`;
    this.removeUrl = `${this.baseUrl}configurations/loan-application/fields`;
    this.updateUrl = `${this.baseUrl}configurations/loan-application/fields`;

    this.searchUrl = `${
      this.baseUrl
    }configurations/loan-application/fields/search`;
    this.datatableUrl = `${
      this.baseUrl
    }configurations/loan-application/fields/data-table`;
  }

  getList(): Observable<Field[]> {
    return this.http.get<Field[]>(this.listUrl);
  }

  filter(searchQuery): Observable<Field[]> {
    return this.http.post<Field[]>(this.searchUrl, searchQuery);
  }

  findById(id): Observable<Field[]> {
    return this.http.post<Field[]>(this.searchUrl, { id });
  }

  getDataTable(dataTablesParameters: any): Observable<DataTablesResponse> {
    return this.http.post<DataTablesResponse>(
      this.datatableUrl,
      dataTablesParameters
    );
  }

  isNameTaken(name): Observable<Field[]> {
    return this.http.post<Field[]>(this.searchUrl, { name });
  }

  add(data: Field): Observable<Field> {
    return this.http.post<Field>(this.addUrl, data);
  }

  update(data: Field): Observable<Field> {
    return this.http.put<Field>(this.updateUrl, data);
  }

  remove(data: Field): Observable<Field> {
    return this.http.delete<Field>(this.removeUrl + '?id=' + data._id);
  }
}

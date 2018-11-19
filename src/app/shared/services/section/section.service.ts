import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section } from '../../models/section';
import { ConfigService } from '../config.service';
import { DataTablesResponse } from '../../models/data-tables-response';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  baseUrl: string;
  listUrl: string;
  addUrl: string;
  removeUrl: string;
  updateUrl: string;
  searchUrl: string;
  datatableUrl: string;

  constructor(private config: ConfigService, private http: HttpClient) {
    this.baseUrl = this.config.get('api').baseUrl;
    this.listUrl = `${this.baseUrl}configurations/loan-application/sections`;
    this.addUrl = `${this.baseUrl}configurations/loan-application/sections`;
    this.removeUrl = `${this.baseUrl}configurations/loan-application/sections`;
    this.updateUrl = `${this.baseUrl}configurations/loan-application/sections`;

    this.searchUrl = `${
      this.baseUrl
    }configurations/loan-application/sections/search`;
    this.datatableUrl = `${
      this.baseUrl
    }configurations/loan-application/sections/data-table`;
  }

  getList(): Observable<Section[]> {
    return this.http.get<Section[]>(this.listUrl);
  }

  findById(id): Observable<Section[]> {
    return this.http.post<Section[]>(this.searchUrl, { id });
  }

  getDataTable(dataTablesParameters: any): Observable<DataTablesResponse> {
    return this.http.post<DataTablesResponse>(
      this.datatableUrl,
      dataTablesParameters
    );
  }

  isNameTaken(name): Observable<Section[]> {
    return this.http.post<Section[]>(this.searchUrl, { name });
  }

  add(data: Section): Observable<Section> {
    return this.http.post<Section>(this.addUrl, data);
  }

  update(data: Section): Observable<Section> {
    return this.http.put<Section>(this.updateUrl, data);
  }

  remove(data: Section): Observable<Section> {
    return this.http.delete<Section>(this.removeUrl + '?id=' + data._id);
  }
}

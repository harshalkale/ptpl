import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanApplication } from '../../models/loan-application';
import { ConfigService } from '../config.service';
import { DataTablesResponse } from '../../models/data-tables-response';

@Injectable({
  providedIn: 'root'
})
export class LoanApplicationService {
  baseUrl: string;
  listUrl: string;
  addUrl: string;
  removeUrl: string;
  updateUrl: string;
  searchUrl: string;
  datatableUrl: string;

  constructor(private config: ConfigService, private http: HttpClient) {
    this.baseUrl = this.config.get('api').baseUrl;
    this.listUrl = `${this.baseUrl}loan-applications`;
    this.addUrl = `${this.baseUrl}loan-applications`;
    this.removeUrl = `${this.baseUrl}loan-applications`;
    this.updateUrl = `${this.baseUrl}loan-applications`;

    this.searchUrl = `${
      this.baseUrl
    }loan-applications/search`;
    this.datatableUrl = `${
      this.baseUrl
    }loan-applications/data-table`;
  }

  getList(): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(this.listUrl);
  }

  filter(searchQuery): Observable<LoanApplication[]> {
    return this.http.post<LoanApplication[]>(this.searchUrl, searchQuery);
  }

  findById(id): Observable<LoanApplication[]> {
    return this.http.post<LoanApplication[]>(this.searchUrl, { id });
  }

  getDataTable(dataTablesParameters: any): Observable<DataTablesResponse> {
    return this.http.post<DataTablesResponse>(
      this.datatableUrl,
      dataTablesParameters
    );
  }

  isApplicationIdTaken(applicationId): Observable<LoanApplication[]> {
    return this.http.post<LoanApplication[]>(this.searchUrl, { applicationId });
  }

  add(data: LoanApplication): Observable<LoanApplication> {
    return this.http.post<LoanApplication>(this.addUrl, data);
  }

  update(data: LoanApplication): Observable<LoanApplication> {
    return this.http.put<LoanApplication>(this.updateUrl, data);
  }

  remove(data: LoanApplication): Observable<LoanApplication> {
    return this.http.delete<LoanApplication>(this.removeUrl + '?id=' + data._id);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanApplicationType } from '../../models/loan-application-type';
import { ConfigService } from '../config.service';
import { DataTablesResponse } from '../../models/data-tables-response';

@Injectable({
  providedIn: 'root'
})
export class LoanApplicationTypeService {
  baseUrl: string;
  listUrl: string;
  addUrl: string;
  removeUrl: string;
  updateUrl: string;
  searchUrl: string;
  datatableUrl: string;

  constructor(private config: ConfigService, private http: HttpClient) {
    this.baseUrl = this.config.get('api').baseUrl;
    this.listUrl = `${
      this.baseUrl
    }configurations/loan-application/loan-application-types`;
    this.addUrl = `${
      this.baseUrl
    }configurations/loan-application/loan-application-types`;
    this.removeUrl = `${
      this.baseUrl
    }configurations/loan-application/loan-application-types`;
    this.updateUrl = `${
      this.baseUrl
    }configurations/loan-application/loan-application-types`;

    this.searchUrl = `${
      this.baseUrl
    }configurations/loan-application/loan-application-types/search`;
    this.datatableUrl = `${
      this.baseUrl
    }configurations/loan-application/loan-application-types/data-table`;
  }

  getList(): Observable<LoanApplicationType[]> {
    return this.http.get<LoanApplicationType[]>(this.listUrl);
  }

  filter(searchQuery): Observable<LoanApplicationType[]> {
    return this.http.post<LoanApplicationType[]>(this.searchUrl, searchQuery);
  }

  findById(id): Observable<LoanApplicationType[]> {
    return this.http.post<LoanApplicationType[]>(this.searchUrl, { id });
  }

  getDataTable(dataTablesParameters: any): Observable<DataTablesResponse> {
    return this.http.post<DataTablesResponse>(
      this.datatableUrl,
      dataTablesParameters
    );
  }

  isNameTaken(name): Observable<LoanApplicationType[]> {
    return this.http.post<LoanApplicationType[]>(this.searchUrl, { name });
  }

  add(data: LoanApplicationType): Observable<LoanApplicationType> {
    return this.http.post<LoanApplicationType>(this.addUrl, data);
  }

  update(data: LoanApplicationType): Observable<LoanApplicationType> {
    return this.http.put<LoanApplicationType>(this.updateUrl, data);
  }

  remove(data: LoanApplicationType): Observable<LoanApplicationType> {
    return this.http.delete<LoanApplicationType>(
      this.updateUrl + '?id=' + data._id
    );
  }
}

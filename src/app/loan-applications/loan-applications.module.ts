import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularResizedEventModule } from 'angular-resize-event';

import { DataTablesModule } from 'angular-datatables';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { LoanApplicationsRoutingModule } from './loan-applications-routing.module';

import { ListComponent } from './containers/list/list.component';
import { AddComponent } from './containers/add/add.component';
import { EditComponent } from './containers/edit/edit.component';
import { RemoveComponent } from './containers/remove/remove.component';
import { ViewComponent } from './containers/view/view.component';

import { DatatableFiltersComponent } from './components/datatable-filters/datatable-filters.component';
import { LoanApplicationFormComponent } from './components/loan-application-form/loan-application-form.component';

@NgModule({
  imports: [
    CommonModule,
    AngularResizedEventModule,
    ReactiveFormsModule,
    DataTablesModule,
    CollapseModule,
    LoanApplicationsRoutingModule
  ],
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent,
    RemoveComponent,
    ViewComponent,
    DatatableFiltersComponent,
    LoanApplicationFormComponent
  ]
})
export class LoanApplicationsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularResizedEventModule } from 'angular-resize-event';

import { DataTablesModule } from 'angular-datatables';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { FieldsRoutingModule } from './fields-routing.module';

import { ListComponent } from './containers/list/list.component';
import { AddComponent } from './containers/add/add.component';
import { EditComponent } from './containers/edit/edit.component';
import { RemoveComponent } from './containers/remove/remove.component';
import { DatatableFiltersComponent } from './components/datatable-filters/datatable-filters.component';
import { FieldFormComponent } from './components/field-form/field-form.component';

@NgModule({
  imports: [
    CommonModule,
    AngularResizedEventModule,
    ReactiveFormsModule,
    DataTablesModule,
    CollapseModule,
    FieldsRoutingModule
  ],
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent,
    RemoveComponent,
    DatatableFiltersComponent,
    FieldFormComponent
  ]
})
export class FieldsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularResizedEventModule } from 'angular-resize-event';

import { DataTablesModule } from 'angular-datatables';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { SectionsRoutingModule } from './sections-routing.module';

import { ListComponent } from './containers/list/list.component';
import { AddComponent } from './containers/add/add.component';
import { EditComponent } from './containers/edit/edit.component';
import { RemoveComponent } from './containers/remove/remove.component';
import { DatatableFiltersComponent } from './components/datatable-filters/datatable-filters.component';
import { SectionFormComponent } from './components/section-form/section-form.component';

@NgModule({
  imports: [
    CommonModule,
    AngularResizedEventModule,
    ReactiveFormsModule,
    DataTablesModule,
    CollapseModule,
    SectionsRoutingModule
  ],
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent,
    RemoveComponent,
    DatatableFiltersComponent,
    SectionFormComponent
  ]
})
export class SectionsModule {}

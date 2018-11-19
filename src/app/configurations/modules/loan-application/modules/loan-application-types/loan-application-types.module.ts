import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';

import { LoanApplicationTypesRoutingModule } from './loan-application-types-routing.module';
import { ListComponent } from './containers/list/list.component';
import { AddComponent } from './containers/add/add.component';
import { EditComponent } from './containers/edit/edit.component';
import { RemoveComponent } from './containers/remove/remove.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    LoanApplicationTypesRoutingModule
  ],
  declarations: [ListComponent, AddComponent, EditComponent, RemoveComponent]
})
export class LoanApplicationTypesModule {}

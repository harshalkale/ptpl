import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoanApplicationsRoutingModule } from './loan-applications-routing.module';
// containers
import { ListComponent } from './containers/list/list.component';
import { AddComponent } from './containers/add/add.component';
import { ViewComponent } from './containers/view/view.component';
// components

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, LoanApplicationsRoutingModule],
  declarations: [ListComponent, AddComponent, ViewComponent]
})
export class LoanApplicationsModule {}

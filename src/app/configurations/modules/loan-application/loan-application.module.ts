import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanApplicationRoutingModule } from './loan-application-routing.module';
import { LoanApplicationTypesModule } from './modules/loan-application-types/loan-application-types.module';
import { SectionsModule } from './modules/sections/sections.module';

@NgModule({
  imports: [
    CommonModule,
    LoanApplicationRoutingModule,
    LoanApplicationTypesModule,
    SectionsModule
  ],
  declarations: []
})
export class LoanApplicationModule {}

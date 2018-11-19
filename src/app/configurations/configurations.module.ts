import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { LoanApplicationModule } from './modules/loan-application/loan-application.module';

@NgModule({
  imports: [CommonModule, ConfigurationsRoutingModule, LoanApplicationModule],
  declarations: []
})
export class ConfigurationsModule {}

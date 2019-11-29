import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'loan-application',
    loadChildren:
      () => import('./modules/loan-application/loan-application.module').then(m => m.LoanApplicationModule)
  },
  {
    path: '',
    redirectTo: 'loan-application'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule {}

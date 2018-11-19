import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'loan-application-types',
    loadChildren:
      './modules/loan-application-types/loan-application-types.module#LoanApplicationTypesModule'
  },
  {
    path: 'sections',
    loadChildren:
      './modules/sections/sections.module#SectionsModule'
  },
  {
    path: '',
    redirectTo: 'loan-application-types'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanApplicationRoutingModule {}

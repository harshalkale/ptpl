import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'loan-application-types',
    loadChildren:
      () => import('./modules/loan-application-types/loan-application-types.module').then(m => m.LoanApplicationTypesModule)
  },
  {
    path: 'sections',
    loadChildren: () => import('./modules/sections/sections.module').then(m => m.SectionsModule)
  },
  {
    path: 'fields',
    loadChildren: () => import('./modules/fields/fields.module').then(m => m.FieldsModule)
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

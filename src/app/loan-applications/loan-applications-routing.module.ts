import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './containers/list/list.component';
import { AddComponent } from './containers/add/add.component';
import { ViewComponent } from './containers/view/view.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  // {
  //   path: 'view/:id',
  //   component: ViewComponent,
  //   resolve: {
  //     'loan-application': LoanApplicationsResolverService
  //   }
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanApplicationsRoutingModule {}

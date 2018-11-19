import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './containers/list/list.component';
import { AddComponent } from './containers/add/add.component';
import { EditComponent } from './containers/edit/edit.component';
import { SectionByIdResolverService } from '../../../../../shared/services/section/section-by-id-resolver.service';
import { RemoveComponent } from './containers/remove/remove.component';
// tslint:disable-next-line:max-line-length
import { LoanApplicationTypeActiveOnlyResolverService } from '../../../../../shared/services/loan-application-type/loan-application-type-active-only-resolver.service';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
    resolve: {
      loanApplicationTypes: LoanApplicationTypeActiveOnlyResolverService
    }
  },
  {
    path: 'add',
    component: AddComponent,
    resolve: {
      loanApplicationTypes: LoanApplicationTypeActiveOnlyResolverService
    }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: {
      loanApplicationTypes: LoanApplicationTypeActiveOnlyResolverService,
      section: SectionByIdResolverService
    }
  },
  {
    path: 'remove/:id',
    component: RemoveComponent,
    resolve: {
      section: SectionByIdResolverService
    }
  },
  {
    path: '',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionsRoutingModule {}

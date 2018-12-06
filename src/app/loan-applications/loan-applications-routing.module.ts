import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './containers/list/list.component';
import { AddComponent } from './containers/add/add.component';
import { EditComponent } from './containers/edit/edit.component';
import { RemoveComponent } from './containers/remove/remove.component';
import { ViewComponent } from './containers/view/view.component';

// tslint:disable-next-line:max-line-length
import { LoanApplicationTypeActiveOnlyResolverService } from '../shared/services/loan-application-type/loan-application-type-active-only-resolver.service';
import { SectionActiveOnlyResolverService } from '../shared/services/section/section-active-only-resolver.service';
import { FieldActiveOnlyResolverService } from '../shared/services/field/field-active-only-resolver.service';
import { LoanApplicationByIdResolverService } from '../shared/services/loan-application/loan-application-by-id-resolver.service';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
    resolve: {
      loanApplicationTypes: LoanApplicationTypeActiveOnlyResolverService,
      sections: SectionActiveOnlyResolverService,
      fields: FieldActiveOnlyResolverService
    }
  },
  {
    path: 'add',
    component: AddComponent,
    resolve: {
      loanApplicationTypes: LoanApplicationTypeActiveOnlyResolverService,
      sections: SectionActiveOnlyResolverService,
      fields: FieldActiveOnlyResolverService
    }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: {
      loanApplicationTypes: LoanApplicationTypeActiveOnlyResolverService,
      sections: SectionActiveOnlyResolverService,
      fields: FieldActiveOnlyResolverService,
      loanApplication: LoanApplicationByIdResolverService
    }
  },
  {
    path: 'remove/:id',
    component: RemoveComponent,
    resolve: {
      loanApplication: LoanApplicationByIdResolverService
    }
  },
  {
    path: 'view/:id',
    component: ViewComponent,
    resolve: {
      loanApplicationTypes: LoanApplicationTypeActiveOnlyResolverService,
      sections: SectionActiveOnlyResolverService,
      fields: FieldActiveOnlyResolverService,
      loanApplication: LoanApplicationByIdResolverService
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
export class LoanApplicationsRoutingModule {}

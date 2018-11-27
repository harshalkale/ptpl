import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './containers/list/list.component';
import { AddComponent } from './containers/add/add.component';
import { EditComponent } from './containers/edit/edit.component';
import { RemoveComponent } from './containers/remove/remove.component';

// tslint:disable-next-line:max-line-length
import { LoanApplicationTypeActiveOnlyResolverService } from '../../../../../shared/services/loan-application-type/loan-application-type-active-only-resolver.service';
import { SectionActiveOnlyResolverService } from '../../../../../shared/services/section/section-active-only-resolver.service';
import { FieldByIdResolverService } from '../../../../../shared/services/field/field-by-id-resolver.service';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
    resolve: {
      loanApplicationTypes: LoanApplicationTypeActiveOnlyResolverService,
      sections: SectionActiveOnlyResolverService
    }
  },
  {
    path: 'add',
    component: AddComponent,
    resolve: {
      loanApplicationTypes: LoanApplicationTypeActiveOnlyResolverService,
      sections: SectionActiveOnlyResolverService
    }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: {
      loanApplicationTypes: LoanApplicationTypeActiveOnlyResolverService,
      sections: SectionActiveOnlyResolverService,
      field: FieldByIdResolverService
    }
  },
  {
    path: 'remove/:id',
    component: RemoveComponent,
    resolve: {
      field: FieldByIdResolverService
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
export class FieldsRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
// tslint:disable-next-line:max-line-length
import { LoanApplicationTypeActiveOnlyResolverService } from '../shared/services/loan-application-type/loan-application-type-active-only-resolver.service';
import { SectionActiveOnlyResolverService } from '../shared/services/section/section-active-only-resolver.service';
import { FieldActiveOnlyResolverService } from '../shared/services/field/field-active-only-resolver.service';
import { RoleActiveOnlyResolverService } from '../shared/services/role/role-active-only-resolver.service';
import { UserActiveOnlyResolverService } from '../shared/services/user/user-active-only-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      loanApplicationTypes: LoanApplicationTypeActiveOnlyResolverService,
      sections: SectionActiveOnlyResolverService,
      fields: FieldActiveOnlyResolverService,
      roles: RoleActiveOnlyResolverService,
      users: UserActiveOnlyResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}

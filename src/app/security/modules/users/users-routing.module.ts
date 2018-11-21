import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './containers/list/list.component';
import { AddComponent } from './containers/add/add.component';
import { EditComponent } from './containers/edit/edit.component';
import { RemoveComponent } from './containers/remove/remove.component';
import { UserByIdResolverService } from '../../../shared/services/user/user-by-id-resolver.service';
import { RoleActiveOnlyResolverService } from '../../../shared/services/role/role-active-only-resolver.service';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
    resolve: {
      roles: RoleActiveOnlyResolverService
    }
  },
  {
    path: 'add',
    component: AddComponent,
    resolve: {
      roles: RoleActiveOnlyResolverService
    }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: {
      roles: RoleActiveOnlyResolverService,
      user: UserByIdResolverService
    }
  },
  {
    path: 'remove/:id',
    component: RemoveComponent,
    resolve: {
      user: UserByIdResolverService
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
export class UsersRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './containers/list/list.component';
import { AddComponent } from './containers/add/add.component';
import { EditComponent } from './containers/edit/edit.component';
import { RemoveComponent } from './containers/remove/remove.component';
import { RoleByIdResolverService } from '../../../shared/services/role/role-by-id-resolver.service';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: {
      role: RoleByIdResolverService
    }
  },
  {
    path: 'remove/:id',
    component: RemoveComponent,
    resolve: {
      role: RoleByIdResolverService
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
export class RolesRoutingModule {}

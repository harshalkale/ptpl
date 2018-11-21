import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'roles',
    loadChildren: './modules/roles/roles.module#RolesModule'
  },
  {
    path: 'users',
    loadChildren: './modules/users/users.module#UsersModule'
  },
  {
    path: '',
    redirectTo: 'roles'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {}

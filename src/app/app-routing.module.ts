import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { PortalComponent } from './shared/containers/portal/portal.component';
import { LoginComponent } from './shared/containers/login/login.component';

import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: PortalComponent,
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'configurations',
    component: PortalComponent,
    loadChildren: './configurations/configurations.module#ConfigurationsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'security',
    component: PortalComponent,
    loadChildren: './security/security.module#SecurityModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'loan-applications',
    component: PortalComponent,
    loadChildren:
      './loan-applications/loan-applications.module#LoanApplicationsModule',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

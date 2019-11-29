import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { PortalComponent } from './shared/containers/portal/portal.component';
import { LoginComponent } from './shared/containers/login/login.component';
import { environment } from '../environments/environment';

import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: PortalComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'configurations',
    component: PortalComponent,
    loadChildren: () => import('./configurations/configurations.module').then(m => m.ConfigurationsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'security',
    component: PortalComponent,
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'loan-applications',
    component: PortalComponent,
    loadChildren:
      () => import('./loan-applications/loan-applications.module').then(m => m.LoanApplicationsModule),
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
      preloadingStrategy: PreloadAllModules,
      // useHash: environment.production
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { PortalComponent } from './shared/containers/portal/portal.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PortalComponent,
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'configurations',
    component: PortalComponent,
    loadChildren: './configurations/configurations.module#ConfigurationsModule'
  },
  {
    path: 'loan-applications',
    component: PortalComponent,
    loadChildren:
      './loan-applications/loan-applications.module#LoanApplicationsModule'
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

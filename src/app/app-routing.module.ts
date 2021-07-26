import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { AuthGuard } from './core/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'internet',pathMatch: 'full' },
  {
    path: 'intranet',
    loadChildren: () =>
      import('./core/menu/menu.module').then((m) => m.MenuModule),
      // canActivate:[AuthGuard]
  },
  {
    path: 'internet',
    loadChildren: () =>
      import('./internet/shared/internet.module').then((m) => m.InternetModule),
      // canActivate:[AuthGuard]W
  },
  {
    path:'**', component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

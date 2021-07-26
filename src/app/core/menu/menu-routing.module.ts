import { AssentamentoModule } from './../../pages/assentamento/assentamento.module';
import { LoginComponent } from './../login/login-form/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../pages/assentamento/assentamento.module').then((m) => m.AssentamentoModule),
      },
      {
        path: 'titulares',
        loadChildren: () =>
          import('../../pages/titulares/titulares.module').then(
            (m) => m.TitularesModule
          ),
      },
      {
        path: 'dependentes',
        loadChildren: () =>
          import('../../pages/dependentes/dependentes.module').then(
            (m) => m.DependentesModule
          ),
      },
    ],
    canActivate: [
      /*AuthGuard*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule { }

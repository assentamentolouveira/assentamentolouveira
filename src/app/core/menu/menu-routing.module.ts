import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { AssentamentoModule } from './../../pages/assentamento/assentamento.module';
import { LoginComponent } from './../login/login-form/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';
import { NovaSenhaComponent } from '../login/nova-senha/nova-senha.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'newPassword', component: NovaSenhaComponent },
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../pages/home/home.module').then((m) => m.HomeModule), canActivate:[AuthGuard]
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
      {
        path: 'assentamentos',
        loadChildren: () =>
          import('../../pages/assentamento/assentamento.module').then(
            (m) => m.AssentamentoModule
          ),
      },
      {
        path: 'configuracoes',
        loadChildren: () =>
          import('../../pages/configuracoes/configuracoes.module').then(
            (m) => m.ConfiguracoesModule
          ),
      },
    ],
    canActivate: [
      AuthGuard
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule { }

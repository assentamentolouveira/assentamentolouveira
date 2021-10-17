import { NovaSenhaComponent } from './../../core/login/nova-senha/nova-senha.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { LoginComponent } from 'src/app/core/login/login-form/login.component';
import { NewUserComponent } from 'src/app/core/login/new-user-form/new-user.component';
import { AssentamentoFormComponent } from 'src/app/pages/assentamento/assentamento-form/assentamento-form.component';
import { HomeInternetFormComponent } from '../pages/home/home-internet-form/home-internet-form.component';
import { TermoAceiteComponent } from '../pages/termo-aceite/termo-aceite.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'newPassword', component: NovaSenhaComponent },
  { path: 'newuser', component: NewUserComponent },
  { path: '', component: TermoAceiteComponent, canActivate:[AuthGuard] },
  { path: ':id/editar', component: AssentamentoFormComponent, canActivate:[AuthGuard]},
  { path: ':id', component: AssentamentoFormComponent, canActivate:[AuthGuard]}

];

export const InternetRoutes = RouterModule.forChild(routes);

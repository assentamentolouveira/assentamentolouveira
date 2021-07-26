import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { LoginComponent } from 'src/app/core/login/login-form/login.component';
import { HomeInternetFormComponent } from '../pages/home/home-internet-form/home-internet-form.component';
import { TermoAceiteComponent } from '../pages/termo-aceite/termo-aceite.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: TermoAceiteComponent, canActivate:[AuthGuard] },
  { path: 'home', component: HomeInternetFormComponent}

];

export const InternetRoutes = RouterModule.forChild(routes);

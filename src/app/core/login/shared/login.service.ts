import { login } from './login.model';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { PoTableColumn } from '@po-ui/ng-components';
import { token } from './token.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseResourceService {
  private autenticado = new BehaviorSubject<boolean>(false);
  isInternet = true;
  private JWTToken = '';
  informacoesDoLogin: login;

  constructor(protected injector: Injector, private router: Router) {
    super(environment.URL + '/usuario/logar', injector);
    this.isInternet = !window.location.href.includes('intranet');
  }

  realizaLogin(usuario: login): Observable<any> {
    if (this.isInternet) {
      return this.http.post(this.apiPath, usuario, this.httpOptions);
    } else {
      return of({ token: 'ok' }, localStorage.setItem('user', 'teste'));
    }
  }

  realizaLogout(): void {
    this.JWTToken = '';
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (this.JWTToken?.length === undefined || this.JWTToken?.length === 0) {
      this.autenticado.next(false);
      return false;
    } else {
      this.autenticado.next(true);
      return true;
    }
  }

  gravaUsuario(usuarioLogado: token): void {
    this.informacoesDoLogin = usuarioLogado;
    this.JWTToken = usuarioLogado.token;
    sessionStorage.setItem('token', usuarioLogado.token)
  }

  getToken(): string | null {
    return sessionStorage.getItem('token')//this.JWTToken;
  }
}

import { TitularCartaoCidadao } from './../../../pages/titulares/shared/titular-cartao-cidadao.model';
import { TitularesService } from './../../../pages/titulares/shared/titulares.service';
import { login } from './login.model';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { PoTableColumn } from '@po-ui/ng-components';
import { token } from './token.model';
import { mergeMap, switchMap, finalize, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseResourceService {
  private autenticado = new BehaviorSubject<boolean>(false);
  isInternet = true;
  private JWTToken = '';
  informacoesDoLogin: login;

  constructor(protected injector: Injector, private router: Router, private titularesService: TitularesService) {
    super(environment.URL + '/usuario/logar', injector);
    this.isInternet = !window.location.href.includes('intranet');
  }

  realizaLogin(usuario: login): Observable<any> {
    if (this.isInternet) {
      return this.http.post(this.apiPath, usuario, this.httpOptions).pipe(
        mergeMap(login => this.retornaDadosCartaoCidadao(login)),
      );
    } else {
      return of({ token: 'ok' }, localStorage.setItem('user', 'teste'));
    }
  }

  retornaDadosCartaoCidadao(login: Object): Observable<any> {
    const cartaoCidadao: TitularCartaoCidadao = {
      nomeResponsavel: "TESTE",
      numeroCartaoCidadao: "123",
      deficiencia: "",
      dataNascimento: new Date('01/01/1989').toLocaleDateString(),
      estadoCivil: 1,
      dependentes: "123,345,567,789",
    }
    return of(cartaoCidadao).pipe(mergeMap((res) => {
      this.titularesService.gravaDadosTitularCartaoCidadao(res);
      return of(login)
    }
    ))
  }

  realizaLogout(): void {
    this.JWTToken = '';
    sessionStorage.removeItem('titular');
    sessionStorage.removeItem('idTitular');
    sessionStorage.removeItem('usuario');
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
    sessionStorage.setItem('usuario', usuarioLogado.idUsuario)
  }

  getToken(): string | null {
    return sessionStorage.getItem('token')//this.JWTToken;
  }
}

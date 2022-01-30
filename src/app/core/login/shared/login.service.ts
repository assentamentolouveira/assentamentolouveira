import { DependentesService } from './../../../pages/dependentes/shared/dependentes.service';
import { CartaoCidadao } from 'src/app/shared/models/cartao-cidadao.model';
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
import { loginBackEnd } from './loginBackEnd.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseResourceService {
  private autenticado = new BehaviorSubject<boolean>(false);
  isInternet = true;
  protected JWTToken = '';
  protected informacoesDoLogin: login;
  protected funcionario: boolean;
  protected perfilAcesso: string

  constructor(protected injector: Injector, private router: Router, private titularesService: TitularesService, private dependentesService: DependentesService) {
    super(environment.URL + '/usuario/logar', injector);
    this.isInternet = !window.location.href.includes('intranet');
  }

  realizaLogin(usuario: loginBackEnd): Observable<any> {
    if (this.isInternet) {
      sessionStorage.removeItem('idTitular');
      sessionStorage.removeItem('moradiaID');
      return this.http.post<login>(this.apiPath, usuario, this.httpOptions).pipe(
        mergeMap(login => this.retornaDadosCartaoCidadao(login)));
    } else {
      return this.http.post<login>(this.apiPath, usuario, this.httpOptions).pipe()
    }
  }

  retornaDadosCartaoCidadao(login: login): Observable<any> {
    const cartaoCidadao: TitularCartaoCidadao = {
      nomeResponsavel: "TESTE",
      numeroCartaoCidadao: "123",
      deficiencia: "",
      dataNascimento: new Date('01/01/1989').toLocaleDateString(),
      estadoCivil: 1,
      dependentes: "123,345,567,789",
    }
    const filter = `&cond=CPF&value=${login.idUsuario}`
    // return this.http.get<TitularCartaoCidadao>(`https://webservice.assistsistemas.com.br/blank_ws_exporta/?user=incidade&pass=NZwdRiQR&cond=CPF&value=27946384831`).
    //   pipe(
    //     mergeMap((res) => {
    //       this.titularesService.gravaDadosTitularCartaoCidadao(res);
    //       return of(login)
    //     }
    //     ))
    return this.http.get<CartaoCidadao>(`${environment.URLCartaoCidadao}${filter}`).pipe(mergeMap((res) => {
      this.titularesService.gravaDadosTitularCartaoCidadao(res);
      if (res.Status !== "100") {
        throw new Error('CPF não é válida no sistema do Cartão Cidadão. Procure um posto de atendimento mais próximo')//({ error:{message: this.retornarErroCartaoCidadao(res.Status)}, status: res.Status });
      }
      return of(login)
    }
    ))
  }

  realizaLogout(): void {
    this.JWTToken = '';
    sessionStorage.removeItem('titular');
    sessionStorage.removeItem('idTitular');
    sessionStorage.removeItem('usuario');
    this.isInternet ? this.router.navigate(['internet/login']) : this.router.navigate(['intranet/login'])
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
    this.funcionario = usuarioLogado.funcionario;
    this.perfilAcesso = usuarioLogado.perfilAcesso
    sessionStorage.setItem('usuario', usuarioLogado.idUsuario)
  }

  getToken(): string | null {
    return this.JWTToken;
  }

  getCPFUsuario(): string {
    return this.informacoesDoLogin.idUsuario
  }

  getTipoFuncionario(): login {
    return this.informacoesDoLogin
  }

  getAcessoInicial(): boolean | undefined {
    return this.informacoesDoLogin.acessoInicial
  }
}

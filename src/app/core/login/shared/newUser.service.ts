import { LoginService } from './login.service';
import { Observable, of } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { newUser } from './newUser.model';
import { environment } from 'src/environments/environment';
import { loginBackEnd } from './loginBackEnd.model';
import { TitularBackEnd } from 'src/app/pages/titulares/shared/titularBackEnd.model';

@Injectable({
  providedIn: 'root'
})
export class NewUserService extends BaseResourceService {

  constructor(protected injector: Injector, private router: Router, private loginService: LoginService) {
    super(environment.URL + '/usuario/', injector);
  }

  validUsuario(cartaoCidadao:number): Observable<any>{
    const filter = `&cond=Numero&value=${cartaoCidadao}`

    return this.http.get(`${environment.URLCartaoCidadao}${filter}`)
  }

  criarUsuario(novoUsuario:newUser){
    const jsonNovoUsuario = {
      idUsuario: novoUsuario.cpf,
      senha: novoUsuario.senha,
      nome: novoUsuario.nome,
      acessoInicial: novoUsuario.acessoInicial?  novoUsuario.acessoInicial :  true,
      funcionario: novoUsuario.funcionario ? novoUsuario.funcionario : false,
      perfilAcesso: novoUsuario.perfilAcesso? novoUsuario.perfilAcesso : "0",
      novaSenha: novoUsuario.novaSenha? novoUsuario.novaSenha : false
    }
    return this.http.post(this.apiPath, jsonNovoUsuario, this.httpOptions);
  }

  excluiUsuario(id: string): Observable<any>{
    return this.http.delete(`${this.apiPath}${id}`)
  }

  alteraUsuario(dadosUsuario: newUser): Observable<newUser>{
    const tipoFuncionario = this.loginService.getTipoFuncionario();
    let jsonUsuarioAlterado = {
      funcionario: tipoFuncionario.funcionario,
      nome: dadosUsuario.nome,
      perfilAcesso: dadosUsuario.perfilAcesso,
      acessoInicial: false,
      novaSenha: dadosUsuario.novaSenha,
      senha: dadosUsuario.novaSenha? dadosUsuario.cpf : undefined
    }

    return this.http.put<newUser>(`${this.apiPath}${dadosUsuario.cpf}`, jsonUsuarioAlterado, this.httpOptions);
  }

  novaSenha(usuario: loginBackEnd, novaSenha: string): Observable<newUser>{
    const tipoFuncionario = this.loginService.getTipoFuncionario();
    const jsonUsuarioAlterado = {
      idUsuario: usuario.idUsuario,
      senhaAtual: usuario.senha,
      senhaNova: novaSenha,
      novaSenha: false
    }
    return this.http.put<newUser>(`${this.apiPath}alterarsenha`, jsonUsuarioAlterado, this.httpOptions);
  }


  resetarSenha(usuario: TitularBackEnd):Observable<any>{
    return this.http.put<newUser>(`${this.apiPath}resetarsenha/${usuario.NumeroCpf}`, {}, this.httpOptions);
  }
}

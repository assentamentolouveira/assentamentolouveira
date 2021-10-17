import { LoginService } from './login.service';
import { Observable, of } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { newUser } from './newUser.model';
import { environment } from 'src/environments/environment';

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

  alteraUsuario(novaSenha: string): Observable<newUser>{
    const tipoFuncionario = this.loginService.getTipoFuncionario();
    const jsonUsuarioAlterado = {
      funcionario: tipoFuncionario.funcionario,
      perfilAcesso: tipoFuncionario.perfilAcesso,
      senha: novaSenha,
      acessoInicial: false,
      novaSenha: false
    }
    return this.http.put<newUser>(`${this.apiPath}/${sessionStorage.getItem('usuario')}`, jsonUsuarioAlterado, this.httpOptions);
  }
}

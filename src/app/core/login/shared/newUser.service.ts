import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';
import { newUser } from './newUser.model';

@Injectable({
  providedIn: 'root'
})
export class NewUserService extends BaseResourceService {

  constructor(protected injector: Injector, private router: Router) {
    super(environment.URL + '/usuario/', injector);
  }

  criarUsuario(novoUsuario:newUser){
    const jsonNovoUsuario = {
      idUsuario: novoUsuario.cpf,
      senha: novoUsuario.senha,
      acessoInicial: true,
      funcionario: false,
      perfilAcesso: "0"
    }
    return this.http.post(this.apiPath, jsonNovoUsuario, this.httpOptions);
  }
}

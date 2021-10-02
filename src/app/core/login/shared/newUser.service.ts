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

  constructor(protected injector: Injector, private router: Router) {
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
      acessoInicial: true,
      funcionario: false,
      perfilAcesso: "0"
    }
    return this.http.post(this.apiPath, jsonNovoUsuario, this.httpOptions);
  }
}

import { Injectable, Injector } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { login } from 'src/app/core/login/shared/login.model';
import { LoginService } from 'src/app/core/login/shared/login.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracoesService extends BaseResourceService {
  private dadosUsuario: login;

  constructor(protected injector: Injector, private loginService: LoginService) {
    super(environment.URL + '/dependente', injector);
  }

  getAll(pagina: number = 0, filtroRecebido?: string): Observable<any> {
    let filtro: string = '';

    this.dadosUsuario = this.loginService.getTipoFuncionario();
    const usuarioIntranet =  this.dadosUsuario.perfilAcesso === 'Administrador' ?  "" : "&$filter=Funcionario eq false"

    pagina = pagina * 10;
    if (filtroRecebido)
      filtro = `&$filter=contains(IdUsuario,'${filtroRecebido}')`

    const queryParams = `$skip=${pagina}` + usuarioIntranet + filtro

    return this.http.get(`${this.httpBusca}usuarioodata?${queryParams}`)
  }

  getColumns(): PoTableColumn[] {
    return [
      {
        property: 'Id',
        width: '35%',
        label: 'Id',
        type: 'string',
        visible: false,
      },
      {
        property: 'Nome',
        width: '35%',
        label: 'Nome',
        type: 'string',
        visible: true,
      },
      {
        property: 'IdUsuarioTratado',
        width: '30%',
        label: 'CPF',
        type: 'string',
        visible: true,
      },
      {
        property: 'PerfilAcessoTratado',
        width: '30%',
        label: 'Perfil de Acesso',
        type: 'string',
        visible: true,
      }
    ];
  }

}

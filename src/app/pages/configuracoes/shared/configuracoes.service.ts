import { Injectable, Injector } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracoesService extends BaseResourceService {
  constructor(protected injector: Injector) {
    super(environment.URL + '/dependente', injector);
  }

  getAll(pagina: number = 0, filtroRecebido?: string): Observable<any> {
    let filtro: string = '';
    const usuarioIntranet =  ''//"&$filter=Funcionario eq true"
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

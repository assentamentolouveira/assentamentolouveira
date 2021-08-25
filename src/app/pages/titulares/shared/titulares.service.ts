import { Titular } from './titular.model';
import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Titulares } from './titulares.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TitularesService extends BaseResourceService {
  constructor(protected injector: Injector) {
    super(environment.URL + '/titular', injector);
  }

  getTitularByCPF(cpf:string):Observable<any>{
    return this.http.get(`${this.apiPath}/${cpf}`)
  }

  criarTitular(titular:Titular) {
    return this.http.post(this.apiPath, titular, this.httpOptions);
  }

  getColumns(): PoTableColumn[] {
    return [
      {
        property: 'id',
        width: '10%',
        label: 'Id',
        type: 'string',
        visible: true,
      },
      {
        property: 'nome',
        width: '40%',
        label: 'Nome',
        type: 'string',
        visible: true,
      },
      {
        property: 'cpf',
        width: '20%',
        label: 'CPF',
        type: 'string',
        visible: true,
      },
      {
        property: 'rg',
        width: '20%',
        label: 'RG',
        type: 'string',
        visible: true,
      },
      {
        property: 'acoes',
        width: '10%',
        label: 'Ações',
        type: 'link',
      },
    ];
  }

  getRendasColumns(): PoTableColumn[] {
    return [
      {
        property: 'tipoRenda',
        width: '65%',
        label: 'Tipo de Renda',
        type: 'string',
        visible: true,
      },
      {
        property: 'valorRenda',
        label: 'Valor',
        type: 'currency',
        format: 'BRL',
        width: '35%',
        visible: true,
      }
    ];
  }
}

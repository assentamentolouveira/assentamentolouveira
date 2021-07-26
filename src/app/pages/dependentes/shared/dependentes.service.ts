import { Injectable, Injector } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Dependentes } from './dependentes.model';

@Injectable({
  providedIn: 'root',
})
export class DependentesService extends BaseResourceService {
  constructor(protected injector: Injector) {
    super('api/dependentes', injector);
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
}

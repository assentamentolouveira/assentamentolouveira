import { Injectable, Injector } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Titulares } from './titulares.model';

@Injectable({
  providedIn: 'root',
})
export class TitularesService extends BaseResourceService {
  constructor(protected injector: Injector) {
    super('api/titulares', injector);
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
        property: 'tipo',
        width: '65%',
        label: 'Tipo de Renda',
        type: 'string',
        visible: true,
      },
      {
        property: 'valor',
        label: 'Valor',
        type: 'currency',
        format: 'BRL',
        width: '35%',
        visible: true,
      }
    ];
  }

  retornaRendas() {
    return [
      { valor: '2500.00', tipo: 'Formal' },
      { valor: '750.99', tipo: 'Informal' },
      { valor: '1200.34', tipo: 'Aposentadoria' },
    ];
  }
}

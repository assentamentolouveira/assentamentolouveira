import { environment } from 'src/environments/environment';
import { PoTableColumn } from '@po-ui/ng-components';
import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Renda } from './renda.model';

@Injectable({
  providedIn: 'root'
})
export class RendasService extends BaseResourceService {
  constructor(protected injector: Injector) {
    super(environment.URL + '/renda', injector);
  }

  getColunas(): PoTableColumn[] {
    return [
      {
        property: 'responsavel',
        width: '32%',
        label: 'Responsavel',
        type: 'string',
        visible: true,
      },
      {
        property: 'valor',
        width: '33%',
        label: 'Nome',
        format:'BRL',
        type: 'currency',
        visible: true,
      },
      {
        property: 'tipo',
        width: '33%',
        label: 'Tipo',
        type: 'string',
        visible: true,
      }
    ];
  }
  getRendasById(cpf: string = ''): Observable<Renda[]> {
    return this.http.get<Renda[]>(this.apiPath)
  }

}

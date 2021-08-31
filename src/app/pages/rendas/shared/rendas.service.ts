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
        property: 'id',
        label: 'id',
        type: 'string',
        visible: false,
      },
      {
        property: 'dependenteId',
        label: 'dependenteId',
        type: 'string',
        visible: false,
      },
      {
        property: 'responsavelRenda',
        width: '32%',
        label: 'Responsavel',
        type: 'string',
        visible: true,
      },
      {
        property: 'valor',
        width: '33%',
        label: 'Nome',
        format: 'BRL',
        type: 'currency',
        visible: true,
      },
      {
        property: 'descricaoRenda',
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

  criarRenda(renda: Renda): Observable<any> {
    const rendaTRatada = this.trataRenda(renda);
    return this.http.post(this.apiPath, rendaTRatada, this.httpOptions);
  }

  alterarRenda(renda: Renda): Observable<any> {
    const rendaTRatada = this.trataRenda(renda);
    return this.http.put(`${this.apiPath}/${rendaTRatada.id}`, rendaTRatada, this.httpOptions);
  }

  trataRenda(renda: Renda): Renda {
    if (renda.titularId === renda.responsavelRenda) {
    } else {
      renda.dependenteId = renda.dependenteId;
    }
    return renda
  }

}

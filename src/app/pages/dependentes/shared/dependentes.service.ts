import { Observable, of } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Dependentes } from './dependentes.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Dependente } from './dependente.model';

@Injectable({
  providedIn: 'root',
})
export class DependentesService extends BaseResourceService {
  constructor(protected injector: Injector) {
    super(environment.URL + '/dependente', injector);
  }

  getColumns(): PoTableColumn[] {
    return [
      {
        property: 'nome',
        width: '50%',
        label: 'Nome',
        type: 'string',
        visible: true,
      },
      {
        property: 'numeroCpf',
        width: '50%',
        label: 'CPF',
        type: 'string',
        visible: true,
      }
    ];
  }

  getAll(): Observable<any> {
    return of(this.retornaDependentes());
  }

  getDepentendesPorTitular(idTitular:string | null): Observable<any> {
    return this.http.get(`${this.apiPath}/titular/${idTitular}`)
  }

  alteraDependente(dependente: Dependente):Observable<any>{
    return this.http.put(`${this.apiPath}/${dependente.id}`, dependente, this.httpOptions);
  }
  getId(): Observable<any> {
    return of(this.retornaDependentes());
  }

  retornaDependentes() {
    return [
      { id: 1, nome: '121', cpf: '1234', rg: 1 },
      { id: 1, nome: '121', cpf: '1234', rg: 1 },
      { id: 1, nome: '121', cpf: '1234', rg: 1 },
      { id: 1, nome: '121', cpf: '1234', rg: 1 },
      { id: 1, nome: '121', cpf: '1234', rg: 1 },
      { id: 1, nome: '121', cpf: '1234', rg: 1 },
      { id: 1, nome: '121', cpf: '1234', rg: 1 },
      { id: 1, nome: '121', cpf: '1234', rg: 1 },
      { id: 1, nome: '121', cpf: '1234', rg: 1 },
      { id: 1, nome: '121', cpf: '1234', rg: 1 },
    ];
  }
}

import { Observable, of } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Dependentes } from './dependentes.model';
import { map, mergeMap, switchMap, toArray } from 'rxjs/operators';
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
        property: 'cpfFormatado',
        width: '25%',
        label: 'CPF',
        type: 'string',
        visible: true,
      },
      {
        property: 'parentesco',
        width: '25%',
        label: 'Parentesco',
        type: 'string',
        visible: true,
      }
    ];
  }

  getAll(): Observable<any> {
    return of(this.retornaDependentes());
  }

  getDepentendesPorTitular(idTitular:string | null): Observable<Dependente[]> {
    return this.http.get<Dependente[]>(`${this.apiPath}/titular/${idTitular}`).pipe(
      switchMap((dependentes) => dependentes),
      mergeMap((a,index)=> {
        return this.getDetalhesDependentesCartaoCidadao(a, index).pipe(
          map(dependente => dependente)
        );
      })
    , toArray())
  }

  getDetalhesDependentesCartaoCidadao(dependente:Dependente, index:number): Observable<Dependente>{
    return of<Dependente>({...dependente, nome:'desenvolvimento' + index, parentesco:'filho'})
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

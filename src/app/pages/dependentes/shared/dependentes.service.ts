import { forkJoin, Observable, of } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Dependentes } from './dependentes.model';
import { map, mergeMap, retry, switchMap, toArray, debounce, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Dependente } from './dependente.model';
import { CartaoCidadao } from 'src/app/shared/models/cartao-cidadao.model';

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
        property: 'grauParentescoTratado',
        width: '10%',
        label: 'Parentesco',
        type: 'string',
        visible: true,
      }
    ];
  }

  getAll(): Observable<any> {
    return of(this.retornaDependentes());
  }

  getDepentendesPorTitular(idTitular: string | null): Observable<Dependente[]> {
    return this.http.get<Dependente[]>(`${this.apiPath}/titular/${idTitular}`).pipe()
  }

  getDepentendesPorTitularComCartaoCidadao(idTitular: string | null): Observable<Dependente[]> {
    return this.http.get<Dependente[]>(`${this.apiPath}/titular/${idTitular}`).pipe(
      switchMap((dependentes) => dependentes),
      mergeMap((dependente) => {
        return this.getDependenteCartaoCidadao(dependente.numeroCartaoCidadao).pipe(
          map(a => Object.assign(dependente, a) )
        );
      })
      , toArray())
  }

  getDetalhesDependentesCartaoCidadao(dependente: Dependente, index: number): Observable<Dependente> {
    return of<Dependente>({ ...dependente, nome: 'desenvolvimento' + index, grauParentesco: 'filho', cpfCartaoCidadao: "" })
  }

  getDependentesDoCartaoCidadao(cartaoDependentes: string[]): Observable<any> {
    let observablesDependentes = {}
    cartaoDependentes.forEach((dependente) => {
      const filter = `&cond=Numero&value=${dependente}`
      Object.assign(observablesDependentes, { [dependente]: this.http.get(`${environment.URLCartaoCidadao}${filter}`).pipe(retry(3)) })
    })
    return of([
      { 123: { Nome: "Dependente Cartao Cidadão 1", Numero: 123, CPF: "39096485844", Estado_Civil: "5", PCD: "3,4", Nascimento:"1956-03-30" }},
      { 345: { Nome: "Dependente Cartao Cidadão 2", Numero: 345, CPF: "25931568908", Estado_Civil: "5", PCD: "null", Nascimento:"1956-03-30"}},
      { 567: { Nome: "Dependente Cartao Cidadão 2", Numero: 567, CPF: "25931568908", Estado_Civil: "5", PCD: "null", Nascimento:"1956-03-30"}},
      { 789: { Nome: "Dependente Cartao Cidadão 2", Numero: 789, CPF: "25931568908", Estado_Civil: "5", PCD: "null", Nascimento:"1956-03-30"},

    }])

    //forkJoin(observablesDependentes)
  }

  getDependenteCartaoCidadao(cartaoCidadao: string | number): Observable<any> {
    const filter = `&cond=Numero&value=${cartaoCidadao}`
    return this.http.get<CartaoCidadao>(`${environment.URLCartaoCidadao}${filter}`).pipe(retry(3))
    // return of({ Nome: "Dependente Cartao Cidadão " + cartaoCidadao, Numero: cartaoCidadao, CPF: "39096488" + new Date().getMilliseconds(), Estado_Civil: "5", PCD: "3,4", Nascimento:"1956-03-30" }).pipe(delay(2000))

  }

  getAllCartaoCidadaoETitular(idTitular: string | null, cartaoDependentes: string[]): Observable<any> {
    let listaTodosOsDependentes = { cartaoCidadao: this.getDependentesDoCartaoCidadao(cartaoDependentes).pipe(retry(3)), assentamento: this.getDepentendesPorTitular(idTitular) }
    return forkJoin(listaTodosOsDependentes).pipe(
    )
  }

  alteraDependente(dependente: Dependente): Observable<any> {
    dependente = this.trataDependente(dependente)
    return this.http.put(`${this.apiPath}/${dependente.id}`, dependente, this.httpOptions);
  }

  getId(): Observable<any> {
    return of(this.retornaDependentes());
  }

  trataDependente(dependente:Dependente): Dependente{
    dependente.naoResidente = this.converterParaBoleano(dependente.naoResidente)
    return dependente
  }

  converterParaBoleano(valor: number | boolean): boolean {
    return valor === 1 ? true : false
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

  incluiDependente(dependente: Dependente): Observable<Dependente> {
    dependente = this.trataDependente(dependente)
    return this.http.post<Dependente>(this.apiPath, dependente, this.httpOptions);
  }

  excluirDependente(idDependente:string): Observable<any>{
    return this.http.delete(`${this.apiPath}/${idDependente}`)
  }
}

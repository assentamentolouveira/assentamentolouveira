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

  private dadosTitular: Titular;

  getTitularByCPF(cpf: string): Observable<any> {
    return this.http.get(`${this.apiPath}/${cpf}`)
  }

  setTitularInfo(titular: Titular): void {
    titular.familiaIncProcHabit = this.converterParaInteiro(titular.familiaIncProcHabit);
    titular.possuiImovel = this.converterParaInteiro(titular.possuiImovel);
    titular.programaHabitacional = this.converterParaInteiro(titular.programaHabitacional);
    titular.regFundOuUsocapiao = this.converterParaInteiro(titular.regFundOuUsocapiao);
    sessionStorage.setItem('titular', JSON.stringify(titular))
    sessionStorage.setItem('idTitular', titular.id)
    this.dadosTitular = titular;
  }

  getTitularInfo(): any {
    const teste = sessionStorage.getItem('titular')
    return teste//this.dadosTitular;
  }

  criarTitular(titular: Titular): Observable<any> {
    titular = this.ajustaEnvioJsonTitular(titular)
    return this.http.post(this.apiPath, titular, this.httpOptions);
  }

  alterarTitular(titular: Titular): Observable<any> {
    titular = this.ajustaEnvioJsonTitular(titular)
    return this.http.put(`${this.apiPath}/${titular.numeroCPF}`, titular, this.httpOptions);
  }

  ajustaEnvioJsonTitular(titular: Titular): Titular {
    titular.familiaIncProcHabit = this.converterParaBoleano(titular.familiaIncProcHabit);
    titular.possuiImovel = this.converterParaBoleano(titular.possuiImovel);
    titular.programaHabitacional = this.converterParaBoleano(titular.programaHabitacional);
    titular.regFundOuUsocapiao = this.converterParaBoleano(titular.regFundOuUsocapiao);
    return titular
  }

  converterParaBoleano(valor: number | boolean): boolean {
    return valor === 1 ? true : false
  }

  converterParaInteiro(valor: number | boolean): number {
    return valor ? 1 : 2
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

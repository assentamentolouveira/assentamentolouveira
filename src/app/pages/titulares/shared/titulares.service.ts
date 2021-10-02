import { CartaoCidadao } from 'src/app/shared/models/cartao-cidadao.model';
import { DependentesService } from './../../dependentes/shared/dependentes.service';
import { TitularCartaoCidadao } from './titular-cartao-cidadao.model';
import { Titular } from './titular.model';
import { Observable, of } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Titulares } from './titulares.model';
import { environment } from 'src/environments/environment';
import { mergeMap, switchMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TitularesService extends BaseResourceService {
  constructor(protected injector: Injector, private dependentesService: DependentesService) {
    super(environment.URL + '/titular', injector);
  }

  private dadosTitular: Titular = this.novoTitular();
  private dadosTitularCartaoCidadao: TitularCartaoCidadao;

  getTitularByCPF(cpf: string): Observable<any> {
    return this.http.get(`${this.apiPath}/${cpf}`)
  }

  setTitularInfo(titular: Titular = this.novoTitular()): void {
    titular.familiaIncProcHabit = this.converterParaInteiro(titular.familiaIncProcHabit);
    titular.possuiImovel = this.converterParaInteiro(titular.possuiImovel);
    titular.programaHabitacional = this.converterParaInteiro(titular.programaHabitacional);
    titular.regFundOuUsocapiao = this.converterParaInteiro(titular.regFundOuUsocapiao);

    this.dadosTitular.aondeRegFundOuUsocapiao = titular.aondeRegFundOuUsocapiao;
    this.dadosTitular.assentamento = titular.assentamento;
    this.dadosTitular.escolaridade = titular.escolaridade;
    this.dadosTitular.etnia = titular.etnia;
    this.dadosTitular.familiaIncProcHabit = titular.familiaIncProcHabit;
    this.dadosTitular.genero = titular.genero;
    this.dadosTitular.id = titular.id;
    this.dadosTitular.numeroCpf = titular.numeroCpf;
    this.dadosTitular.numeroSelagemAntiga = titular.numeroSelagemAntiga;
    this.dadosTitular.numeroSelagemAtual = titular.numeroSelagemAtual;
    this.dadosTitular.possuiImovel = titular.possuiImovel;
    this.dadosTitular.programaHabitacional = titular.programaHabitacional;
    this.dadosTitular.qualLocalDoImovel = titular.qualLocalDoImovel;
    this.dadosTitular.qualProgHabitacional = titular.qualProgHabitacional;
    this.dadosTitular.qualRegFundOuUsocapiao = titular.qualRegFundOuUsocapiao;
    this.dadosTitular.quantidadeFamilia = titular.quantidadeFamilia;
    this.dadosTitular.regFundOuUsocapiao = titular.regFundOuUsocapiao;
    this.dadosTitular.tempoMoradiaBairro = titular.tempoMoradiaBairro;
    this.dadosTitular.tempoMoradiaLouveira = titular.tempoMoradiaLouveira;
    this.dadosTitular.telefoneTitular = titular.telefoneTitular,
    this.dadosTitular.telefoneContato = titular.telefoneContato,
    this.dadosTitular.email = titular.email

    sessionStorage.removeItem('titular');
    sessionStorage.removeItem('idTitular');
    sessionStorage.setItem('titular', JSON.stringify(this.dadosTitular))
    sessionStorage.setItem('idTitular', titular.id)
  }

  getTitularInfo(): any {
    return sessionStorage.getItem('titular');
  }

  criarTitular(titular: Titular): Observable<any> {
    titular = this.ajustaEnvioJsonTitular(titular)
    return this.http.post(this.apiPath, titular, this.httpOptions).pipe()
  }

  gravaDadosTitularCartaoCidadao(dadosCartaoCidade: CartaoCidadao): void {
    this.dadosTitular.nomeResponsavel = dadosCartaoCidade.Nome;
    this.dadosTitular.numeroCartaoCidadao = dadosCartaoCidade.Numero;
    this.dadosTitular.deficiencia = dadosCartaoCidade.PCD;
    this.dadosTitular.estadoCivil = dadosCartaoCidade.Estado_Civil;
    this.dadosTitular.dependentes = dadosCartaoCidade.CCMesmoEndereco;
    this.dadosTitular.dataNascimento = dadosCartaoCidade.Nascimento;
  }

  alterarTitular(titular: Titular): Observable<any> {
    titular = this.ajustaEnvioJsonTitular(titular)
    return this.http.put(`${this.apiPath}/${titular.numeroCpf}`, titular, this.httpOptions);
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

  novoTitular(): Titular {
    return {
      id: "",
      assentamento: "",
      numeroSelagemAtual: "",
      numeroSelagemAntiga: "",
      nomeResponsavel: "",
      numeroCartaoCidadao: "",
      numeroCpf: "",
      dataNascimento: "",
      genero: 1,
      etnia: 1,
      escolaridade: 1,
      deficiencia: "",
      estadoCivil: 1,
      rendaTotal: 1,
      familiaIncProcHabit: 1,
      quantidadeFamilia: 1,
      tempoMoradiaBairro: 1,
      tempoMoradiaLouveira: 1,
      possuiImovel: 1,
      qualLocalDoImovel: "",
      programaHabitacional: 1,
      qualProgHabitacional: "",
      regFundOuUsocapiao: 1,
      qualRegFundOuUsocapiao: "",
      aondeRegFundOuUsocapiao: "",
      dependentes: ""
    }
  }
}

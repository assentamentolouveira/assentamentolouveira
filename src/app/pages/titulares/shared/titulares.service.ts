import { CartaoCidadao } from 'src/app/shared/models/cartao-cidadao.model';
import { DependentesService } from './../../dependentes/shared/dependentes.service';
import { TitularCartaoCidadao } from './titular-cartao-cidadao.model';
import { Titular } from './titular.model';
import { Observable, of, throwError } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Titulares } from './titulares.model';
import { environment } from 'src/environments/environment';
import { map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { NgSwitchCase } from '@angular/common';

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
    // titular.familiaIncProcHabit = this.converterParaInteiro(titular.familiaIncProcHabit);
    // titular.possuiImovel = this.converterParaInteiro(titular.possuiImovel);
    // titular.programaHabitacional = this.converterParaInteiro(titular.programaHabitacional);
    // titular.regFundOuUsocapiao = this.converterParaInteiro(titular.regFundOuUsocapiao);
    // this.dadosTitular.aondeRegFundOuUsocapiao = titular.aondeRegFundOuUsocapiao;
    // this.dadosTitular.familiaIncProcHabit = titular.familiaIncProcHabit;
    // this.dadosTitular.possuiImovel = titular.possuiImovel;
    // this.dadosTitular.programaHabitacional = titular.programaHabitacional;
    // this.dadosTitular.qualLocalDoImovel = titular.qualLocalDoImovel;
    // this.dadosTitular.qualProgHabitacional = titular.qualProgHabitacional;
    // this.dadosTitular.qualRegFundOuUsocapiao = titular.qualRegFundOuUsocapiao;
    // this.dadosTitular.quantidadeFamilia = titular.quantidadeFamilia;
    // this.dadosTitular.regFundOuUsocapiao = titular.regFundOuUsocapiao;
    // this.dadosTitular.tempoMoradiaBairro = titular.tempoMoradiaBairro;
    // this.dadosTitular.tempoMoradiaLouveira = titular.tempoMoradiaLouveira;

    this.dadosTitular.assentamento = titular.assentamento;
    this.dadosTitular.escolaridade = titular.escolaridade;
    this.dadosTitular.etnia = titular.etnia;
    this.dadosTitular.genero = titular.genero;
    this.dadosTitular.id = titular.id;
    this.dadosTitular.numeroCpf = titular.numeroCpf === '' ? this.dadosTitular.numeroCpf : titular.numeroCpf;
    this.dadosTitular.numeroSelagemAntiga = titular.numeroSelagemAntiga;
    this.dadosTitular.numeroSelagemAtual = titular.numeroSelagemAtual;
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
    this.dadosTitular.numeroCpf = dadosCartaoCidade.CPF;
    this.dadosTitular.estadoCivil = dadosCartaoCidade.Estado_Civil;
    this.dadosTitular.dependentes = dadosCartaoCidade.CCMesmoEndereco;
    this.dadosTitular.dataNascimento = dadosCartaoCidade.Nascimento;
  }

  getDadosCartaoCidadao(cpf: string): Observable<CartaoCidadao> {
    const filter = `&cond=CPF&value=${cpf}`
    return this.http.get<CartaoCidadao>(`${environment.URLCartaoCidadao}${filter}`).pipe(
      map(res => {
        if (res.Status !== "100") {
          console.log("Erro:" + res.Status)
          throw new Error(this.retornarErroCartaoCidadao(res.Status))//({ error:{message: this.retornarErroCartaoCidadao(res.Status)}, status: res.Status });
        }
        return res
      })
    )
  }

  retornarErroCartaoCidadao(codigoErro: string): string {
    let mensagemDeErro = ''
    switch (codigoErro) {
      case '101':
        mensagemDeErro = 'Parâmentro(s) não informado(s)';
        break;
      case '102':
        mensagemDeErro = 'Conexão parametrizada inativa';
        break;
      case '103':
        mensagemDeErro = 'Login inativo';
        break;
      case '104':
        mensagemDeErro = 'Campo para busca enviado via parametro inexistente';
        break;
      case '105':
        mensagemDeErro = 'Condição enviada via parametro não é com campo de pesquisa';
        break;
      case '106':
        mensagemDeErro = 'Quantidade de acessos por minuto excedido ao parametrizado';
        break;
      case '107':
        mensagemDeErro = 'Quantidade de acessos por hora excedido ao parametrizado';
        break;
      case '108':
        mensagemDeErro = 'Quantidade de acessos por dia excedido ao parametrizado';
        break;
      case '109':
        mensagemDeErro = 'Erro ao conectar ao Banco de Dados';
        break;
      case '110':
        mensagemDeErro = 'Consulta realizada - nenhum registro localizado';
        break;
      case '111':
        mensagemDeErro = 'Usuário / Senha inválido';
        break;
      case '112':
        mensagemDeErro = 'Login de Teste';
        break;
      default:
        console.log(`Erro ${codigoErro} não identificado. Favor entrar em contato com o time de TI.`);

    }
    return mensagemDeErro

  }

  alterarTitular(titular: Titular): Observable<any> {
    titular = this.ajustaEnvioJsonTitular(titular)
    return this.http.put(`${this.apiPath}/${titular.numeroCpf}`, titular, this.httpOptions);
  }

  ajustaEnvioJsonTitular(titular: Titular): Titular {
    // titular.familiaIncProcHabit = this.converterParaBoleano(titular.familiaIncProcHabit);
    // titular.possuiImovel = this.converterParaBoleano(titular.possuiImovel);
    // titular.programaHabitacional = this.converterParaBoleano(titular.programaHabitacional);
    // titular.regFundOuUsocapiao = this.converterParaBoleano(titular.regFundOuUsocapiao);
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
        property: 'Id',
        width: '35%',
        label: 'Id',
        type: 'string',
        visible: true,
      },
      {
        property: 'NumeroCpf',
        width: '30%',
        label: 'CPF',
        type: 'string',
        visible: false,
      },
      {
        property: 'cpfFormatado',
        width: '30%',
        label: 'CPF',
        type: 'string',
        visible: true,
      },
      {
        property: 'NumeroCartaoCidadao',
        width: '30%',
        label: 'Cartão Cidadão',
        type: 'string',
        visible: true,
      }
    ];
  }

  getAll(pagina: number = 0, filtroRecebido?: string): Observable<any> {
    let filtro: string = '';
    pagina = pagina * 10;
    if (filtroRecebido)
      filtro = `&$filter=contains(NumeroCpf,'${filtroRecebido}') or NumeroCartaoCidadao eq ${filtroRecebido}`

    const queryParams = `$skip=${pagina}` + filtro

    return this.http.get(`${this.httpBusca}titularodata?${queryParams}`)
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
      dependentes: ""
    }
  }
}

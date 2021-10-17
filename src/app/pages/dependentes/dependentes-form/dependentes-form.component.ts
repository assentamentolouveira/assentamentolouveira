import { Titular } from './../../titulares/shared/titular.model';
import { DocumentPipe } from './../../../shared/pipes/document.pipe';
import { Dependente } from './../shared/dependente.model';
import { OpcoesComboService } from 'src/app/shared/services/opcoes-combo.service';
import { DependentesService } from './../shared/dependentes.service';
import { PoTableAction, PoTableColumn, PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { Component, Injector, OnDestroy, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Dependentes } from '../shared/dependentes.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { take, finalize, retry } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TitularesService } from '../../titulares/shared/titulares.service';
import { CartaoCidadao } from 'src/app/shared/models/cartao-cidadao.model';

@Component({
  selector: 'app-dependentes-form',
  templateUrl: './dependentes-form.component.html',
  styles: [
  ]
})
export class DependentesFormComponent extends BaseResourceFormComponent<Dependentes> implements OnDestroy {
  public colunas: PoTableColumn[];
  public listaDependentes: Array<any> = []
  public acoes: Array<PoTableAction> = [
    {
      icon: 'po-icon-edit',
      label: 'Adicionar/Editar',
      action: this.editarDependente.bind(this)
    }

  ];

  public dependenteSelecionado: string = '';
  public carregandoTabela = false;
  public habilitaConfirmacao = true;
  public realizandoAlteracao = false;
  public parentescoResponsavelOpcoes: Array<PoSelectOption>;
  public estadoCivilOpcoes: Array<PoSelectOption>;
  public escolaridadeOpcoes: Array<PoSelectOption>;
  public deficienciaOpcoes: Array<PoSelectOption>;
  public boleanoOpcoes: Array<PoSelectOption>;
  public isDesktop = false;

  private subscriptionFormularioDependente: Subscription;
  private buscaCartaoCidadaoFinalizada = false;
  private buscaLocalFinalizada = false;
  private listaDependentesCartaoCidadao: Dependente[] = [];
  private listaDependentesLocal: Dependente[] = [];
  private dependentesTratados: Dependente[] = [];

  @Input() isDependente: boolean = false;
  @Output() enviaDependentes = new EventEmitter()

  constructor(private dependentesService: DependentesService
    , private poNotificationService: PoNotificationService
    , private fb: FormBuilder
    , private documentPipe: DocumentPipe
    , private opcoesComboService: OpcoesComboService
    , protected injector: Injector
    , private titularService: TitularesService
    , private deviceService: DeviceDetectorService) {
    super(injector, new Dependentes(), dependentesService);
    this.parentescoResponsavelOpcoes = this.opcoesComboService.parentescoResponsavelOpcoes;
    this.estadoCivilOpcoes = this.opcoesComboService.estadoCivilOpcoes;
    this.escolaridadeOpcoes = this.opcoesComboService.escolaridadeOpcoes;
    this.deficienciaOpcoes = this.opcoesComboService.deficienciaOpcoes;
    this.boleanoOpcoes = this.opcoesComboService.boleanoOpcoes;
    this.poNotificationService.setDefaultDuration(3000);
    this.isDesktop = this.deviceService.isDesktop();
  }

  public formularioDependente: FormGroup;

  ngOnInit(): void {
    this.colunas = this.dependentesService.getColumns();
    this.montaFormulario();
    this.carregaDados();
  }

  montaFormulario(): void {
    this.formularioDependente = this.fb.group({
      nomeResponsavel: [''],
      numeroCartaoCidadao: [''],
      numeroCPF: [''],
      dataNascimento: [''],
      grauParentesco: ['', Validators.required],
      estadoCivil: [''],
      escolaridade: ['', Validators.required],
      deficiencia: [''],
      naoResidente: ['', Validators.required],
    });

    this.subscriptionFormularioDependente = this.formularioDependente.valueChanges.subscribe(() => {
      this.habilitaConfirmacao = this.formularioDependente.valid
    }
    )
  }

  carregaDados(): void {
    this.carregandoTabela = true;
    this.realizandoAlteracao = true;
    this.dependentesTratados = [];
    this.listaDependentesCartaoCidadao = [];
    this.listaDependentesLocal = [];

    const dadosTitular: Titular = JSON.parse(this.titularService.getTitularInfo());
    let listaDeDepententes: string[] = String(dadosTitular.dependentes).split(',');
    if (String(sessionStorage.getItem('idTitular'))?.length > 0 && listaDeDepententes.length > 0) {
      this.retornaDadosdoCartaoCidadao(listaDeDepententes, dadosTitular.nomeResponsavel);
      this.retornaDependentesCadastrados(dadosTitular);
    }
  }

  retornaDadosdoCartaoCidadao(listaDeDepententes: string[], nomeResponsavel: string): void {
    let count = 0
    listaDeDepententes.forEach(dependente => {
      this.dependentesService.getDependenteCartaoCidadao(dependente).pipe(
        finalize(() => {
          this.buscaCartaoCidadaoFinalizada = true;
          this.unificaDependentes()
        })
      ).subscribe(
        res => {
          const pipeCPF = new DocumentPipe()
          this.listaDependentesCartaoCidadao.push({
            id: '',
            cpfFormatado: pipeCPF.transform(res.CPF),
            nomeResponsavel: nomeResponsavel,
            numeroCartaoCidadao: res.Numero,
            numeroCpf: res.CPF,
            dataNascimento: new Date(res.Nascimento),
            grauParentesco: 'Não relacionado ao titular',
            estadoCivil: res.Estado_Civil,
            escolaridade: '',
            deficiencia: res.PCD,
            nome: res.Nome,
            cpfCartaoCidadao: res.CPF,
            naoResidente:false,
            grauParentescoTratado: 'Não relacionado ao Titular'
          })
        },
        error => this.poNotificationService.error(`Erro ao Retornar os dados do Dependente. Número do Cartão Cidadão: ${dependente}.`)
      )
    })
  }

  retornaDependentesCadastrados(dadosTitular: any): void {
    this.dependentesService.getDepentendesPorTitular(dadosTitular.id).pipe(
      finalize(() => {
        this.buscaLocalFinalizada = true;
        this.unificaDependentes()
      })
    ).subscribe(
      res => {
        res.map(cartao => {
          this.listaDependentesLocal.push({
            id: cartao.id,
            cpfFormatado: cartao.cpfFormatado,
            nomeResponsavel: cartao.cpfFormatado,
            numeroCartaoCidadao: cartao.numeroCartaoCidadao,
            numeroCpf: cartao.numeroCpf,
            dataNascimento: cartao.dataNascimento,
            grauParentesco: cartao.grauParentesco,
            estadoCivil: cartao.estadoCivil,
            escolaridade: cartao.escolaridade,
            deficiencia: cartao.deficiencia,
            nome: cartao.nome,
            cpfCartaoCidadao: cartao.cpfCartaoCidadao,
            naoResidente: this.converterParaInteiro(cartao.naoResidente),
            grauParentescoTratado: this.converteParentesco(cartao.grauParentesco)
          })

        })
      },
      error => {
        if (error.status != 404) {
          this.poNotificationService.error(`Erro ao buscar dependentes: ${error.message}`)
        }
      }
    );
  }

  unificaDependentes(): void {
    if (this.buscaCartaoCidadaoFinalizada && this.buscaLocalFinalizada) {
      console.log("FINALIZEI 100%")
      this.dependentesTratados = this.listaDependentesCartaoCidadao;

      this.listaDependentesLocal.map(cartao => {
        this.dependentesTratados.filter(
          (dependente, indice) => {
            if (dependente.numeroCartaoCidadao == cartao.numeroCartaoCidadao) {
              this.dependentesTratados[indice].id = cartao.id;
              this.dependentesTratados[indice].grauParentesco = cartao.grauParentesco;
              this.dependentesTratados[indice].grauParentescoTratado = cartao.grauParentescoTratado;
              this.dependentesTratados[indice].escolaridade = cartao.escolaridade;
              this.dependentesTratados[indice].naoResidente = cartao.naoResidente;
            }
          }
        )
      })

      this.listaDependentes = this.dependentesTratados.sort((a, b) => {
        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
      });
      this.enviaDependentes.emit(this.dependentesTratados)
      this.carregandoTabela = false;
      this.realizandoAlteracao = false
    }
  }

  excluiDependente(): void {
    this.realizandoAlteracao = true;
    this.dependentesService.excluirDependente(this.dependenteSelecionado).pipe(
      finalize(() => this.realizandoAlteracao = false)
    ).subscribe(
      res => {
        this.poNotificationService.success("Dependente Excluído com Sucesso");
        this.dependenteSelecionado = '';
        this.carregaDados();
      }
      ,
      error => this.poNotificationService.error(error)
    );
  }

  converteParentesco(grauParentesco: string): string {
    return this.opcoesComboService.retornaLabelOpcoes(grauParentesco, this.opcoesComboService.parentescoResponsavelOpcoes)
  }

  carregarMais(): void {
    this.carregaDados();
  }

  editarDependente(dependenteSelecionado: Dependente): void {
    this.dependenteSelecionado = dependenteSelecionado.id === '' ? 'novo' : dependenteSelecionado.id;
    this.formularioDependente.patchValue({
      nomeResponsavel: dependenteSelecionado.nomeResponsavel,
      numeroCartaoCidadao: dependenteSelecionado.numeroCartaoCidadao,
      numeroCPF: dependenteSelecionado.cpfCartaoCidadao,
      dataNascimento: dependenteSelecionado.dataNascimento,
      grauParentesco: dependenteSelecionado.grauParentesco,
      estadoCivil: dependenteSelecionado.estadoCivil,
      escolaridade: dependenteSelecionado.escolaridade,
      deficiencia: dependenteSelecionado.deficiencia,
      naoResidente: dependenteSelecionado.naoResidente,
    })
  }

  cancelarEdicao(): void {
    this.dependenteSelecionado = '';
    this.poNotificationService.warning("Alteração Cancelada");
  }

  salvarEdicao(): void {
    if (this.formularioDependente.valid) {
      this.realizandoAlteracao = true;
      if (this.dependenteSelecionado === 'novo') {
        const dependente = { ...this.formularioDependente.value, titularId: sessionStorage.getItem('idTitular') }
        this.dependentesService.incluiDependente(dependente).pipe(
          take(1),
          finalize(() => this.carregaDados())
        ).subscribe(
          res => {
            this.poNotificationService.success('Registro Alterado com Sucesso')
            this.dependenteSelecionado = '';
          },
          error => this.poNotificationService.error(error)
        )
      } else {
        const dependente = { ...this.formularioDependente.value, id: this.dependenteSelecionado, titularId: sessionStorage.getItem('idTitular') }
        this.dependentesService.alteraDependente(dependente).pipe(
          take(1),
          finalize(() => this.carregaDados())
        ).subscribe(
          res => {
            this.poNotificationService.success('Registro Alterado com Sucesso')
            this.dependenteSelecionado = '';
          },
          error => this.poNotificationService.error(error)
        )
      }
    }

  }

  converterParaInteiro(valor: number | boolean): number {
    return valor ? 1 : 2
  }

  protected buildResourceForm(): void { }

  protected creationPageTitle(): string {
    return 'Novo Títular';
  }

  protected editionPageTitle(): string {
    return 'Editando dependente';
  }

  ngOnDestroy(): void {
    this.subscriptionFormularioDependente.unsubscribe();
  }
}

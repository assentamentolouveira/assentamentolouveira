import { Titular } from './../shared/titular.model';
import { Router } from '@angular/router';
import { RendasService } from './../../rendas/shared/rendas.service';
import { Component, EventEmitter, Injector, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoRadioGroupOption, PoSelectOption, PoTableAction, PoTableColumn, PoNotificationService } from '@po-ui/ng-components';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Titulares } from '../shared/titulares.model';
import { TitularesService } from './../shared/titulares.service';
import { Renda } from '../../rendas/shared/renda.model';
import { debounce, debounceTime, take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpcoesComboService } from 'src/app/shared/services/opcoes-combo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-titulares-form',
  templateUrl: './titulares-form.component.html',
  styles: [],
})
export class TitularesFormComponent extends BaseResourceFormComponent<Titulares> implements OnDestroy {
  private formularioPreenchido = false;
  private subscriptionFormularioTitular: Subscription;
  private dadosTitular: Titular;
  private telaIniciada:boolean = false;

  public formularioTitular: FormGroup;

  public valorRenda: number;
  public tipoRenda: string = '';
  public modalAberto: boolean = false;

  public programaContempladoAtivo = false;
  public programaContempladoPaisAtivo = false;
  public localDoImovelAtivo = false;


  public estadoCivilOpcoes: Array<PoSelectOption>;
  public parentescoOpcoes: Array<PoSelectOption>;
  public etniaOpcoes: Array<PoSelectOption>;
  public generoOpcoes: Array<PoSelectOption>;
  public escolaridadeOpcoes: Array<PoSelectOption>;
  public naturalidadeOpcoes: Array<PoSelectOption>;
  public deficienciaOpcoes: Array<PoSelectOption>;
  public boleanoOpcoes: Array<PoSelectOption>;
  public familiaDomicilioOpcoes: Array<PoSelectOption>;
  public tempoDeMoradiaOpcoes: Array<PoSelectOption>;
  public colunasRenda: PoTableColumn[];
  public listaRendas: Array<any> = []
  public acoes: Array<PoTableAction> = [
    {
      icon: 'po-icon-edit',
      label: 'Editar Renda',
      action: this.editarRenda.bind(this)
    },
    {
      icon: 'po-icon-user-delete',
      label: 'Remover Renda',
      type: 'danger',

    }

  ];

  public confirmar: PoModalAction = {
    action: () => {
      if (!this.formularioPreenchido) {
        this.poNotificationService.error("Informe o valor e tipo de renda")
      } else {
        this.formularioPreenchido = false;
        this.fecharModal();
        this.poNotificationService.success("Renda Adicionada com sucesso")
      };
    },
    label: 'Confirmar'
  };

  //Campos do Formulário

  @Input() isDependente = false;
  @Input() edicao = false;

  @Output() formularioTitularValido: EventEmitter<FormGroup> = new EventEmitter()

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  constructor(
    protected titularesService: TitularesService,
    protected injector: Injector,
    private poNotificationService: PoNotificationService,
    private rendasService: RendasService,
    private opcoesComboService: OpcoesComboService,
    private fb: FormBuilder,
  ) {
    super(injector, new Titulares(), titularesService);
    this.dadosTitular = JSON.parse(this.titularesService.getTitularInfo());
    this.estadoCivilOpcoes = this.opcoesComboService.estadoCivilOpcoes;
    this.generoOpcoes = this.opcoesComboService.generoOpcoes;
    this.parentescoOpcoes = this.opcoesComboService.parentescoOpcoes;
    this.etniaOpcoes = this.opcoesComboService.etniaOpcoes;
    this.escolaridadeOpcoes = this.opcoesComboService.escolaridadeOpcoes;
    this.deficienciaOpcoes = this.opcoesComboService.deficienciaOpcoes;
    this.boleanoOpcoes = this.opcoesComboService.boleanoOpcoes;
    this.familiaDomicilioOpcoes = this.opcoesComboService.familiaDomicilioOpcoes;
    this.tempoDeMoradiaOpcoes = this.opcoesComboService.tempoDeMoradiaOpcoes;
    this.poNotificationService.setDefaultDuration(3000);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.criaFormulario();
    this.initialize();
  }

  criaFormulario(): void {
    this.formularioTitular = this.fb.group({
      assentamento: ['-'],
      numeroSelagemAtual: [''],
      numeroSelagemAntiga: [''],
      nomeResponsavel: [this.dadosTitular.nomeResponsavel],
      numeroCartaoCidadao: [this.dadosTitular.numeroCartaoCidadao],
      numeroCpf: [sessionStorage.getItem('usuario')],
      dataNascimento: [new Date(this.dadosTitular.dataNascimento)],
      genero: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      etnia: ['', Validators.compose([Validators.required])],
      escolaridade: ['', Validators.compose([Validators.required])],
      deficiencia: [this.dadosTitular.deficiencia],
      estadoCivil: [this.dadosTitular.estadoCivil],
      rendaTotal: [''],
      familiaIncProcHabit: ['', Validators.compose([Validators.required])],
      quantidadeFamilia: ['', Validators.compose([Validators.required])],
      tempoMoradiaBairro: ['', Validators.compose([Validators.required])],
      tempoMoradiaLouveira: ['', Validators.compose([Validators.required])],
      possuiImovel: ['', Validators.compose([Validators.required])],
      qualLocalDoImovel: [''],
      programaHabitacional: ['', Validators.compose([Validators.required])],
      qualProgHabitacional: [''],
      regFundOuUsocapiao: ['', Validators.compose([Validators.required])],
      qualRegFundOuUsocapiao: [''],
      aondeRegFundOuUsocapiao: ['']
    });

    if (this.edicao) {
      this.montaFormularioEdicao()
    }
  }

  protected buildResourceForm(): void { }

  protected creationPageTitle(): string {
    return 'Novo Títular';
  }

  protected editionPageTitle(): string {
    const titularCPF = this.resource.nome || '';
    return 'Editando Titular:' + titularCPF;
  }

  editarRenda(rendaSelecionada: any): void {
    this.valorRenda = parseFloat(rendaSelecionada.valorRenda);
    this.tipoRenda = rendaSelecionada.tipoRenda;
    this.abrirModal();
  }

  montaFormularioEdicao(): void {
    this.formularioTitular.patchValue({
      assentamento: this.dadosTitular.assentamento,
      numeroSelagemAtual: this.dadosTitular.numeroSelagemAtual,
      numeroSelagemAntiga: this.dadosTitular.numeroSelagemAntiga,
      nomeResponsavel: this.dadosTitular.nomeResponsavel,
      numeroCartaoCidadao: this.dadosTitular.numeroCartaoCidadao,
      numeroCpf: this.route.snapshot.paramMap.get('id'),
      dataNascimento: new Date(this.dadosTitular.dataNascimento),
      genero: this.dadosTitular.genero,
      etnia: this.dadosTitular.etnia,
      escolaridade: this.dadosTitular.escolaridade,
      deficiencia: this.dadosTitular.deficiencia,
      estadoCivil: this.dadosTitular.estadoCivil,
      rendaTotal: this.dadosTitular.rendaTotal,
      familiaIncProcHabit: this.dadosTitular.familiaIncProcHabit,
      quantidadeFamilia: this.dadosTitular.quantidadeFamilia,
      tempoMoradiaBairro: this.dadosTitular.tempoMoradiaBairro,
      tempoMoradiaLouveira: this.dadosTitular.tempoMoradiaLouveira,
      possuiImovel: this.dadosTitular.possuiImovel,
      qualLocalDoImovel: this.dadosTitular.qualLocalDoImovel,
      programaHabitacional: this.dadosTitular.programaHabitacional,
      qualProgHabitacional: this.dadosTitular.qualProgHabitacional,
      regFundOuUsocapiao: this.dadosTitular.regFundOuUsocapiao,
      qualRegFundOuUsocapiao: this.dadosTitular.qualRegFundOuUsocapiao,
      aondeRegFundOuUsocapiao: this.dadosTitular.aondeRegFundOuUsocapiao
    });
  }

  adicionaRenda(): void {
    this.valorRenda = 0;
    this.tipoRenda = '';
    this.abrirModal();
  }

  abrirModal(): void {
    this.modalAberto = true;
    this.poModal.open();
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.poModal.close();
  }

  atualizaRenda(): void {
    this.formularioPreenchido = true;
  }

  initialize(): void {
    // this.colunasRenda = this.titularesService.getRendasColumns();

    // this.rendasService.getRendasById(this.dadosTitular.id).pipe(
    //   take(1)
    // ).subscribe(res => this.listaRendas = res);

    this.subscriptionFormularioTitular = this.formularioTitular.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(res => this.telaIniciada ? this.formularioTitularValido.emit(this.formularioTitular) : this.telaIniciada = true)

  }

  jaContempladoSelecionado(selecionado: number) {
    if (selecionado === 1) {
      this.programaContempladoAtivo = true
    } else {
      this.programaContempladoAtivo = false;
      this.formularioTitular.patchValue({ qualProgHabitacional: "" })
    }
  }

  jaContempladoPaisSelecionado(selecionado: number) {
    if (selecionado === 1) {
      this.programaContempladoPaisAtivo = true
    } else {
      this.programaContempladoPaisAtivo = false;
      this.formularioTitular.patchValue({ qualRegFundOuUsocapiao: "", aondeRegFundOuUsocapiao: "" })
    }
  }

  possuiImovelSelecionado(selecionado: number) {
    if (selecionado === 1) {
      this.localDoImovelAtivo = true;
    } else {
      this.localDoImovelAtivo = false;
      this.formularioTitular.patchValue({ qualLocalDoImovel: "" })
    }
  }

  converterBooleanString(valorBooleano: boolean): string {
    if (valorBooleano) {
      return 'true'
    } else {
      return 'false'
    }
  }

  ngOnDestroy() {
    this.subscriptionFormularioTitular.unsubscribe();
  }
}

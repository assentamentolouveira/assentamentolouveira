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
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpcoesComboService } from 'src/app/shared/services/opcoes-combo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-titulares-form',
  templateUrl: './titulares-form.component.html',
  styleUrls: ['./titulares-form.component.css'],
})
export class TitularesFormComponent extends BaseResourceFormComponent<Titulares> implements OnDestroy {
  private formularioPreenchido = false;
  private subscriptionFormularioTitular: Subscription;
  private dadosTitular: Titular;
  private telaIniciada: boolean = false;

  public formularioTitular: FormGroup;

  public valorRenda: number;
  public tipoRenda: string = '';
  public modalAberto: boolean = false;

  public acessoInternet = true;


  public estadoCivilOpcoes: Array<PoSelectOption>;
  public parentescoOpcoes: Array<PoSelectOption>;
  public etniaOpcoes: Array<PoSelectOption>;
  public generoOpcoes: Array<PoSelectOption>;
  public escolaridadeOpcoes: Array<PoSelectOption>;
  public naturalidadeOpcoes: Array<PoSelectOption>;
  public deficienciaOpcoes: Array<PoSelectOption>;
  public boleanoOpcoes: Array<PoSelectOption>;
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
    this.poNotificationService.setDefaultDuration(3000);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.criaFormulario();
    this.initialize();
    this.markAsDirtyInvalidControls(this.formularioTitular.controls);
  }

  criaFormulario(): void {
    this.formularioTitular = this.fb.group({
      assentamento: ['-'],
      numeroSelagemAtual: [''],
      numeroSelagemAntiga: [''],
      nome: [this.dadosTitular.nome],
      numeroCartaoCidadao: [this.dadosTitular.numeroCartaoCidadao],
      numeroCpf: [this.dadosTitular.numeroCpf],
      dataNascimento: [new Date(this.dadosTitular.dataNascimento + ' 00:00:00')],
      genero: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      etnia: ['', Validators.compose([Validators.required])],
      escolaridade: ['', Validators.compose([Validators.required])],
      deficiencia: [this.convertePCD(this.dadosTitular.deficiencia)],
      estadoCivil: [this.dadosTitular.estadoCivil],
      rendaTotal: [''],
      telefoneTitular: [''],
      telefoneContato: [''],
      email: [''],
      bairro: [this.dadosTitular.bairro],
      logradouro: [this.dadosTitular.logradouro],
      numeroLogradouro: [this.dadosTitular.numeroLogradouro],
      complemento: [this.dadosTitular.complemento],
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
      nome: this.dadosTitular.nome,
      numeroCartaoCidadao: this.dadosTitular.numeroCartaoCidadao,
      numeroCpf: this.route.snapshot.paramMap.get('id'),
      dataNascimento: new Date(this.dadosTitular.dataNascimento + ' 00:00:00'),
      genero: this.dadosTitular.genero,
      etnia: this.dadosTitular.etnia,
      escolaridade: this.dadosTitular.escolaridade,
      deficiencia: this.convertePCD(this.dadosTitular.deficiencia),
      estadoCivil: this.dadosTitular.estadoCivil,
      rendaTotal: this.dadosTitular.rendaTotal,
      telefoneTitular: this.dadosTitular.telefoneTitular,
      telefoneContato: this.dadosTitular.telefoneContato,
      email: this.dadosTitular.email,
      bairro: this.dadosTitular.bairro,
      logradouro: this.dadosTitular.logradouro,
      numeroLogradouro: this.dadosTitular.numeroLogradouro,
      complemento: this.dadosTitular.complemento
    });

    // this.dadosTitular.qualLocalDoImovel.length > 0 ? this.localDoImovelAtivo = true : this.localDoImovelAtivo = false;
    // this.dadosTitular.qualProgHabitacional.length > 0 ? this.programaContempladoAtivo = true : this.programaContempladoAtivo = false;
    // this.dadosTitular.qualRegFundOuUsocapiao.length > 0 ? this.programaContempladoPaisAtivo = true : this.programaContempladoPaisAtivo = false;
    // this.dadosTitular.aondeRegFundOuUsocapiao.length > 0 ? this.programaContempladoPaisAtivo = true : this.programaContempladoPaisAtivo = false;

    this.formularioTitularValido.emit(this.formularioTitular)
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
      debounceTime(300)
    ).subscribe(res => {
      this.telaIniciada ? this.formularioTitularValido.emit(this.formularioTitular) : this.telaIniciada = true
    })

  }

  converterBooleanString(valorBooleano: boolean): string {
    if (valorBooleano) {
      return 'true'
    } else {
      return 'false'
    }
  }

  convertePCD(pcd: string): string {
    let pcdTratado = pcd ? pcd : '';
    pcdTratado = pcdTratado.replace('1', 'Física');
    pcdTratado = pcdTratado.replace('2', 'Mental');
    pcdTratado = pcdTratado.replace('3', 'Auditiva');
    pcdTratado = pcdTratado.replace('4', 'Visual');
    return pcdTratado
  }

  protected markAsDirtyInvalidControls(controls: { [key: string]: AbstractControl }) {
    for (const key in controls) {
      if (controls.hasOwnProperty(key)) {
        const control = controls[key];

        if (control.invalid) {
          control.markAsDirty();
        }
      }
    }
  }

  ngOnDestroy() {
    this.subscriptionFormularioTitular.unsubscribe();
  }
}

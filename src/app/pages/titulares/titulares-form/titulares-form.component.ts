import { RendasService } from './../../rendas/shared/rendas.service';
import { Component, Injector, Input, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoRadioGroupOption, PoSelectOption, PoTableAction, PoTableColumn, PoNotificationService } from '@po-ui/ng-components';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Titulares } from '../shared/titulares.model';
import { TitularesService } from './../shared/titulares.service';
import { Renda } from '../../rendas/shared/renda.model';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpcoesComboService } from 'src/app/shared/services/opcoes-combo.service';

@Component({
  selector: 'app-titulares-form',
  templateUrl: './titulares-form.component.html',
  styles: [],
})
export class TitularesFormComponent extends BaseResourceFormComponent<Titulares> {
  private formularioPreenchido = false;
  public formularioTitular: FormGroup;

  public valorRenda: number = 0;
  public tipoRenda: string = '';
  public modalAberto: boolean = false;

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

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  constructor(
    protected titularesService: TitularesService,
    protected injector: Injector,
    private poNotificationService: PoNotificationService,
    private rendasService: RendasService,
    private opcoesComboService: OpcoesComboService,
    private fb: FormBuilder
  ) {
    super(injector, new Titulares(), titularesService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.criaFormulario();
    this.initialize();
  }

  criaFormulario(): void {
    this.formularioTitular = this.fb.group({
      assentamento: [''],
      selagemAtual: [''],
      selagemAntiga: [''],
      nomeResponsavel: [''],
      numeroCartaoCidadao: [''],
      numeroCPF: [''],
      dataNascimento: [''],
      genero: [''],
      racaEtinia: [''],
      escolaridade: [''],
      deficiencia: [''],
      estadoCivil: [''],
      rendaTotal: [''],
      familiaNoProcessoHabitacional: [''],
      familiaPorDomicilio: [''],
      tempoMoradiaBairro: [''],
      tempoMoradiaLouveira: [''],
      possuiImovel: [''],
      localImovel: [''],
      jaContemplado: [''],
      programaContemplado: [''],
      contempladoNoPais: [''],
      programaContempladoPais: [''],
      ondeProgramaContempladoPais: ['']
    });
  }

  protected buildResourceForm(): void { }

  protected creationPageTitle(): string {
    return 'Novo Títular';
  }

  protected editionPageTitle(): string {
    const titularesNome = this.resource.nome || '';
    return 'Editando Titular:' + titularesNome;
  }

  editarRenda(rendaSelecionada: any): void {
    this.valorRenda = parseFloat(rendaSelecionada.valorRenda);
    this.tipoRenda = rendaSelecionada.tipoRenda;
    this.abrirModal();
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
    this.estadoCivilOpcoes = this.opcoesComboService.estadoCivilOpcoes;
    this.generoOpcoes = this.opcoesComboService.generoOpcoes;
    this.parentescoOpcoes = this.opcoesComboService.parentescoOpcoes;
    this.etniaOpcoes = this.opcoesComboService.etniaOpcoes;
    this.escolaridadeOpcoes = this.opcoesComboService.escolaridadeOpcoes;
    this.deficienciaOpcoes = this.opcoesComboService.deficienciaOpcoes;
    this.boleanoOpcoes = this.opcoesComboService.boleanoOpcoes;
    this.familiaDomicilioOpcoes = this.opcoesComboService.familiaDomicilioOpcoes;
    this.tempoDeMoradiaOpcoes = this.opcoesComboService.tempoDeMoradiaOpcoes;
    this.colunasRenda = this.titularesService.getRendasColumns();

    this.rendasService.getRendasById().pipe(
      take(1)
    ).subscribe(res => this.listaRendas = res);
  }
}

import { DocumentPipe } from './../../../shared/pipes/document.pipe';
import { Dependente } from './../shared/dependente.model';
import { OpcoesComboService } from 'src/app/shared/services/opcoes-combo.service';
import { DependentesService } from './../shared/dependentes.service';
import { PoTableAction, PoTableColumn, PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { Component, Injector, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Dependentes } from '../shared/dependentes.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { take, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

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
      label: 'Editar',
      action: this.editarDependente.bind(this)
    }

  ];

  public dependenteSelecionado: string = '';
  public carregandoTabela = false;
  public habilitaConfirmacao = false;
  public realizandoAlteracao = false;
  public parentescoResponsavelOpcoes: Array<PoSelectOption>;
  public estadoCivilOpcoes: Array<PoSelectOption>;
  public escolaridadeOpcoes: Array<PoSelectOption>;
  public deficienciaOpcoes: Array<PoSelectOption>;
  public isDesktop = false;

  private subscriptionFormularioDependente: Subscription;

  @Output() enviaDependentes = new EventEmitter()

  constructor(private dependentesService: DependentesService
    , private poNotificationService: PoNotificationService
    , private fb: FormBuilder
    , private documentPipe: DocumentPipe
    , private opcoesComboService: OpcoesComboService
    , protected injector: Injector
    , private deviceService: DeviceDetectorService) {
    super(injector, new Dependentes(), dependentesService);
    this.parentescoResponsavelOpcoes = this.opcoesComboService.parentescoResponsavelOpcoes;
    this.estadoCivilOpcoes = this.opcoesComboService.estadoCivilOpcoes;
    this.escolaridadeOpcoes = this.opcoesComboService.escolaridadeOpcoes;
    this.deficienciaOpcoes = this.opcoesComboService.deficienciaOpcoes;
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
      parentesco: [''],
      estadoCivil: [''],
      escolaridade: [''],
      deficiencia: [''],
    });

    this.subscriptionFormularioDependente = this.formularioDependente.valueChanges.subscribe(() => {
      this.habilitaConfirmacao = this.formularioDependente.valid
    }
    )
  }

  carregaDados(): void {
    this.carregandoTabela = true;
    this.realizandoAlteracao = true;
    this.dependentesService.getDepentendesPorTitular(sessionStorage.getItem('idTitular')).pipe(
      take(1),
      finalize(() => { this.carregandoTabela = false; this.realizandoAlteracao = false })
    ).subscribe(resposta => {
      // resposta = resposta.map((dependente: any) => {
      //   return { ...dependente, nome: 'teste' }
      // })
      const teste = new DocumentPipe()
      resposta.map(res => { res.parentesco = this.converteParentesco(res), res.cpfFormatado = teste.transform(res.numeroCpf) })
      this.enviaDependentes.emit(resposta);
      this.listaDependentes = resposta;
    }, error => {
      if (error.status != 404) {
        this.poNotificationService.error("Erro ao buscar a Renda")
      }
      this.enviaDependentes.emit([])
    }
    );
  }

  converteParentesco(dependente: Dependente): string {
    return this.opcoesComboService.retornaLabelOpcoes(dependente.parentesco, this.opcoesComboService.parentescoOpcoes)
  }

  carregarMais(): void {
    this.carregaDados();
  }

  editarDependente(dependenteSelecionado: Dependente): void {
    this.dependenteSelecionado = dependenteSelecionado.id;
    this.formularioDependente.patchValue({
      nomeResponsavel: dependenteSelecionado.nomeResponsavel,
      numeroCartaoCidadao: dependenteSelecionado.numeroCartaoCidadao,
      numeroCPF: '39096485888',
      dataNascimento: dependenteSelecionado.dataNascimento,
      parentesco: dependenteSelecionado.parentesco,
      estadoCivil: dependenteSelecionado.estadoCivil,
      escolaridade: dependenteSelecionado.escolaridade,
      deficiencia: dependenteSelecionado.deficiencia,
    })
  }

  cancelarEdicao(): void {
    this.dependenteSelecionado = '';
    this.poNotificationService.warning("Alteração Cancelada");
  }

  salvarEdicao(): void {
    if (this.formularioDependente.valid) {
      this.realizandoAlteracao = true;
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

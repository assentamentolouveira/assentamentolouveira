import { Titular } from './../../titulares/shared/titular.model';
import { TitularesService } from './../../titulares/shared/titulares.service';
import { Component, EventEmitter, Injector, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoNotificationService, PoSelectOption, PoComboOption } from '@po-ui/ng-components';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { OpcoesComboService } from 'src/app/shared/services/opcoes-combo.service';
import { MoradiaService } from '../shared/moradia.service';
import { Moradias } from '../shared/moradias.model';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-moradia-form',
  templateUrl: './moradia-form.component.html',
  styleUrls: ['./moradia-form.component.css'],
})
export class MoradiaFormComponent extends BaseResourceFormComponent<Moradias> implements OnDestroy {

  private subscriptionFormularioMoradia: Subscription;
  private telaIniciada: boolean = false;

  private dadosTitular: Titular;

  public formularioMoradia: FormGroup;

  public familiaTemCadastroUnicoOpcoes: Array<PoSelectOption>;
  public boleanoOpcoes: Array<PoSelectOption>;
  public moradiaOpcoes: Array<PoSelectOption>;
  public quantidadeBanheirosOpcoes: Array<PoSelectOption>;
  public quantidadeComodosOpcoes: Array<PoSelectOption>;
  public tipoMoradiaOpcoes: Array<PoSelectOption>;
  public caracteristicasCasaOpcoes: Array<PoSelectOption>;
  public acessoEnergiaOpcoes: Array<PoSelectOption>;
  public acessoAguaOpcoes: Array<PoSelectOption>;
  public acessoSaneamentoOpcoes: Array<PoSelectOption>;
  public numeroAutomoveiOpcoes: Array<PoSelectOption>;
  public desastresOpcoes: Array<PoSelectOption>;
  public usoMoradiaOpcoes: Array<PoSelectOption>;
  public familiaAcessaUnidadeBasicaSaude = false;

  @Output() formularioMoradiaValido: EventEmitter<FormGroup> = new EventEmitter()


  constructor(protected injector: Injector,
    private poNotificationService: PoNotificationService,
    private opcoesComboService: OpcoesComboService,
    private moradiaService: MoradiaService,
    private titularesService: TitularesService,
    private fb: FormBuilder,
  ) {
    super(injector, new Moradias(), moradiaService);
    this.dadosTitular = JSON.parse(this.titularesService.getTitularInfo());
  }

  protected buildResourceForm(): void { }

  protected creationPageTitle(): string {
    return 'Nova Moradia';
  }

  protected editionPageTitle(): string {
    return 'Editando Moradia';
  }

  ngOnInit(): void {
    this.initialize();
    this.criaFormulario()
  }

  initialize(): void {
    this.familiaTemCadastroUnicoOpcoes = this.opcoesComboService.familiaTemCadastroUnicoOpcoes;
    this.boleanoOpcoes = this.opcoesComboService.boleanoOpcoes;
    this.moradiaOpcoes = this.opcoesComboService.moradiaOpcoes;
    this.quantidadeBanheirosOpcoes = this.opcoesComboService.quantidadeBanheirosOpcoes;
    this.quantidadeComodosOpcoes = this.opcoesComboService.quantidadeComodosOpcoes;
    this.tipoMoradiaOpcoes = this.opcoesComboService.tipoMoradiaOpcoes;
    this.caracteristicasCasaOpcoes = this.opcoesComboService.caracteristicasCasaOpcoes;
    this.acessoEnergiaOpcoes = this.opcoesComboService.acessoEnergiaOpcoes;
    this.acessoAguaOpcoes = this.opcoesComboService.acessoAguaOpcoes;
    this.acessoSaneamentoOpcoes = this.opcoesComboService.acessoSaneamentoOpcoes;
    this.numeroAutomoveiOpcoes = this.opcoesComboService.numeroAutomoveiOpcoes;
    this.desastresOpcoes = this.opcoesComboService.desastresOpcoes;
    this.usoMoradiaOpcoes = this.opcoesComboService.usoMoradiaOpcoes;

  }

  criaFormulario(): void {
    this.formularioMoradia = this.fb.group({
      assentamento: ['-', Validators.compose([Validators.required])],
      numeroSelagemAtual: ['', Validators.compose([Validators.required])],
      numeroSelagemAntiga: ['', Validators.compose([Validators.required])],
      endereco: ['', Validators.compose([Validators.required])],
      numero: ['', Validators.compose([Validators.required])],
      complemento: ['', Validators.compose([Validators.required])],
      bairro: ['', Validators.compose([Validators.required])],
      familiaTemCadastroUnico: ['', Validators.compose([Validators.required])],
      familiaAcessaUnidadeBasicaSaude: ['', Validators.compose([Validators.required])],
      qualUnidadeBasicaSaude: ['', Validators.compose([Validators.required])],
      familiaAcessoEscolas: ['', Validators.compose([Validators.required])],
      utilizaTransporteEscolar: ['', Validators.compose([Validators.required])],
      familiaAcessaCRAS: ['', Validators.compose([Validators.required])],
      familiaAcessaCREAS: ['', Validators.compose([Validators.required])],
      familiaAcessaServicosConvivenciaCrianca: ['', Validators.compose([Validators.required])],
      familiaAcessaServicosConvivenciaIdosos: ['', Validators.compose([Validators.required])],
      moradia: ['', Validators.compose([Validators.required])],
      quantidadeBanheiros: ['', Validators.compose([Validators.required])],
      quantidadeComodos: ['', Validators.compose([Validators.required])],
      tipoMoradiaOcupada: ['', Validators.compose([Validators.required])],
      caracteristicasCasa: ['', Validators.compose([Validators.required])],
      acessoEnergiaEletrica: ['', Validators.compose([Validators.required])],
      acessoAbastecimentoAgua: ['', Validators.compose([Validators.required])],
      acessoSaneamentoSanitario: ['', Validators.compose([Validators.required])],
      possuiAutomoveis: ['', Validators.compose([Validators.required])],
      moradiaSofreuDesastre: ['', Validators.compose([Validators.required])],
      usoMoradia: ['', Validators.compose([Validators.required])],
      cachorro: [''],
      gato: [''],
      passaro: [''],
      outroAnimal: [''],
      energiaEletrica: ['', Validators.compose([Validators.required])],
      aguaEsgoto: ['', Validators.compose([Validators.required])],
      gastoAlimentacao: [''],
      gastoMedicamentos: [''],
      totalDespesas: [''],
      observacoes: [''],

    });

    this.subscriptionFormularioMoradia = this.formularioMoradia.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(res => this.telaIniciada ? this.formularioMoradiaValido.emit(this.formularioMoradia) : this.telaIniciada = true)

    // , Validators.compose([Validators.required])
  }

  familiaAcessaUnidadeBasicaSaudeSelecionado(selecionado: number) {
    if (selecionado === 1) {
      this.familiaAcessaUnidadeBasicaSaude = true;
    } else {
      this.familiaAcessaUnidadeBasicaSaude = false;
      this.formularioMoradia.patchValue({ qualUnidadeBasicaSaude: "" })
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
    this.subscriptionFormularioMoradia.unsubscribe();
  }
}

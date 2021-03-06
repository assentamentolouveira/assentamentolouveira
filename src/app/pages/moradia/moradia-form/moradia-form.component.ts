import { Validacoes } from 'src/app/shared/validações/validacoes';
import { LoginService } from './../../../core/login/shared/login.service';
import { Titular } from './../../titulares/shared/titular.model';
import { TitularesService } from './../../titulares/shared/titulares.service';
import { Component, EventEmitter, Injector, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoNotificationService, PoSelectOption, PoComboOption, PoMultiselectOption } from '@po-ui/ng-components';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { OpcoesComboService } from 'src/app/shared/services/opcoes-combo.service';
import { MoradiaService } from '../shared/moradia.service';
import { Moradias } from '../shared/moradias.model';
import { Subscription } from 'rxjs';
import { debounceTime, take, finalize } from 'rxjs/operators';
import { Moradia } from '../shared/moradia.model';

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
  public acessoColetaDeLixoOpcoes: Array<PoSelectOption>;
  public numeroAutomoveiOpcoes: Array<PoSelectOption>;
  public desastresOpcoes: Array<PoSelectOption>;
  public usoMoradiaOpcoes: Array<PoSelectOption>;
  public familiaAcessaUnidadeBasicaSaude = false;
  public acessoInternet = true;
  public carregando = false;
  public isInternet = false;
  public familiaDomicilioOpcoes: Array<PoSelectOption>;
  public tempoDeMoradiaOpcoes: Array<PoSelectOption>;
  public assentamentoOpcoes: Array<PoSelectOption>;
  public localDoImovelAtivo = false;
  public programaContempladoAtivo = false;
  public programaContempladoPaisAtivo = false;
  public aluguelObrigatorio = "false";
  public aluguelHabilitado = "true";




  @Output() formularioMoradiaValido: EventEmitter<FormGroup> = new EventEmitter()


  constructor(protected injector: Injector,
    private poNotificationService: PoNotificationService,
    private opcoesComboService: OpcoesComboService,
    private moradiaService: MoradiaService,
    private titularesService: TitularesService,
    private loginService: LoginService,
    private fb: FormBuilder,
  ) {
    super(injector, new Moradias(), moradiaService);
    this.dadosTitular = JSON.parse(this.titularesService.getTitularInfo());
    this.isInternet = loginService.isInternet;
    this.familiaDomicilioOpcoes = this.opcoesComboService.familiaDomicilioOpcoes;
    this.tempoDeMoradiaOpcoes = this.opcoesComboService.tempoDeMoradiaOpcoes;
    this.assentamentoOpcoes = this.opcoesComboService.assentamentoOpcoes;


  }

  protected buildResourceForm(): void { }

  protected creationPageTitle(): string {
    return 'Nova Moradia';
  }

  protected editionPageTitle(): string {
    return 'Editando Moradia';
  }

  ngOnInit(): void {
    this.acessoInternet = this.loginService.isInternet;
    this.poNotificationService.setDefaultDuration(3000);
    this.initialize();
    this.criaFormulario()
    this.markAsDirtyInvalidControls(this.formularioMoradia.controls);
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
    this.acessoColetaDeLixoOpcoes = this.opcoesComboService.acessoColetaDeLixoOpcoes;
    this.numeroAutomoveiOpcoes = this.opcoesComboService.numeroAutomoveiOpcoes;
    this.desastresOpcoes = this.opcoesComboService.desastresOpcoes;
    this.usoMoradiaOpcoes = this.opcoesComboService.usoMoradiaOpcoes;

    this.moradiaService.getMoradiabyTitular(String(sessionStorage.getItem('idTitular'))).pipe(
      take(1),
      finalize(() => this.carregando = true)
    ).subscribe(
      res => { sessionStorage.setItem('moradiaID', String(res.id)), this.montaFormularioEdicao(res) },
      error => {
        sessionStorage.removeItem('moradiaID')
        console.log(error)
      }
    )
  }

  criaFormulario(): void {
    this.formularioMoradia = this.fb.group({
      titularId: [String(sessionStorage.getItem('idTitular'))],
      assentamento: ['']/*this.isInternet ? [''] : ['', Validators.compose([Validators.required])]*/,
      numeroSelagemAtual: [''],
      numeroSelagemAntiga: [''],
      endereco: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cadastroUnicoFamilia: [''],
      acessaUnidBasicaSaude: [''],
      qualUnidBasicaSaude: [''],
      temAcessoEscolaCreche: [''],
      utilizaTransporteEscolar: [''],
      acessaCras: [''],
      acessaCreas: [''],
      acessaServConvivenciaCriancaAdolescente: [''],
      acessaServConvivenciaCriancaIdoso: [''],
      tipoMoradia: [''],
      quantidadeBanheiro: [''],
      quantidadeComodo: [''],
      tipoMoradiaOcupada: [''],
      caracteristicaMoradia: ['', Validators.compose([Validators.required])],
      acessoEnergiaEletrica: ['', Validators.compose([Validators.required])],
      acessoAbastecimentoAgua: ['', Validators.compose([Validators.required])],
      acessoSaneamentoSanitario: ['', Validators.compose([Validators.required])],
      acessoColetaLixo: ['', Validators.compose([Validators.required])],
      possuiAutomovel: ['', Validators.compose([Validators.required])],
      desastreMoradia: ['', Validators.compose([Validators.required])],
      usoMoradia: ['', Validators.compose([Validators.required])],
      cachorro: [],
      gato: [],
      passaro: [],
      outroAnimais: [],
      gastoComAluguel: [],
      gastoComEnergiaEletrica: [],
      gastoComAguaEsgoto: [],
      gastoComGas: [],
      gastoComAlimentacaoHigieneLimpeza: [],
      gastoComMedicamento: [],
      totalDeDespesasMensais: [],
      observacao: [''],
      familiaIncProcHabit: [''],
      quantidadeFamilia: ['', Validators.compose([Validators.required])],
      tempoMoradiaBairro: [''],
      tempoMoradiaLouveira: ['', Validators.compose([Validators.required])],
      possuiImovel: [, Validators.compose([Validators.required])],
      qualLocalDoImovel: [''],
      programaHabitacional: ['', Validators.compose([Validators.required])],
      qualProgHabitacional: [''],
      regFundOuUsocapiao: ['', Validators.compose([Validators.required])],
      qualRegFundOuUsocapiao: [''],
      aondeRegFundOuUsocapiao: [''],


    });

    this.subscriptionFormularioMoradia = this.formularioMoradia.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(res => this.telaIniciada ? this.enviaFormulario() : this.telaIniciada = true)

    // , Validators.compose([Validators.required])
  }

  montaFormularioEdicao(moradia: Moradia): void {
    this.formularioMoradia.patchValue({
      assentamento: moradia.assentamento,
      numeroSelagemAtual: moradia.numeroSelagemAtual,
      numeroSelagemAntiga: moradia.numeroSelagemAntiga,
      endereco: moradia.endereco,
      numero: moradia.numero,
      complemento: moradia.complemento,
      bairro: moradia.bairro,
      cadastroUnicoFamilia: moradia.cadastroUnicoFamilia,
      acessaUnidBasicaSaude: moradia.acessaUnidBasicaSaude,
      qualUnidBasicaSaude: moradia.qualUnidBasicaSaude,
      temAcessoEscolaCreche: moradia.temAcessoEscolaCreche,
      utilizaTransporteEscolar: moradia.utilizaTransporteEscolar,
      acessaCras: moradia.acessaCras,
      acessaCreas: moradia.acessaCreas,
      acessaServConvivenciaCriancaAdolescente: moradia.acessaServConvivenciaCriancaAdolescente,
      acessaServConvivenciaCriancaIdoso: moradia.acessaServConvivenciaCriancaIdoso,
      tipoMoradia: moradia.tipoMoradia,
      quantidadeBanheiro: moradia.quantidadeBanheiro,
      quantidadeComodo: moradia.quantidadeComodo,
      tipoMoradiaOcupada: moradia.tipoMoradiaOcupada,
      caracteristicaMoradia: moradia.caracteristicaMoradia,
      acessoEnergiaEletrica: moradia.acessoEnergiaEletrica,
      acessoAbastecimentoAgua: moradia.acessoAbastecimentoAgua,
      acessoSaneamentoSanitario: moradia.acessoSaneamentoSanitario,
      acessoColetaLixo: moradia.acessoColetaLixo,
      possuiAutomovel: moradia.possuiAutomovel,
      desastreMoradia: moradia.desastreMoradia,
      usoMoradia: moradia.usoMoradia,
      cachorro: moradia.cachorro,
      gato: moradia.gato,
      passaro: moradia.passaro,
      outroAnimais: moradia.outroAnimais,
      gastoComAluguel: moradia.gastoComAluguel,
      gastoComEnergiaEletrica: moradia.gastoComEnergiaEletrica,
      gastoComAguaEsgoto: moradia.gastoComAguaEsgoto,
      gastoComGas: moradia.gastoComGas,
      gastoComAlimentacaoHigieneLimpeza: moradia.gastoComAlimentacaoHigieneLimpeza,
      gastoComMedicamento: moradia.gastoComMedicamento,
      totalDeDespesasMensais: moradia.totalDeDespesasMensais,
      observacao: moradia.observacao,

      familiaIncProcHabit: this.converterParaInteiro(moradia.familiaIncProcHabit),
      quantidadeFamilia: moradia.quantidadeFamilia,
      tempoMoradiaLouveira: moradia.tempoMoradiaLouveira,
      tempoMoradiaBairro: moradia.tempoMoradiaBairro,
      possuiImovel: this.converterParaInteiro(moradia.possuiImovel),
      qualLocalDoImovel: moradia.qualLocalDoImovel,
      programaHabitacional: this.converterParaInteiro(moradia.programaHabitacional),
      qualProgHabitacional: moradia.qualProgHabitacional,
      regFundOuUsocapiao: this.converterParaInteiro(moradia.regFundOuUsocapiao),
      qualRegFundOuUsocapiao: moradia.qualRegFundOuUsocapiao,
      aondeRegFundOuUsocapiao: moradia.aondeRegFundOuUsocapiao,
    });

    !!moradia.qualLocalDoImovel && moradia.qualLocalDoImovel.length > 0 ? this.localDoImovelAtivo = true : this.localDoImovelAtivo = false;
    !!moradia.qualProgHabitacional && moradia.qualProgHabitacional.length > 0 ? this.programaContempladoAtivo = true : this.programaContempladoAtivo = false;
    !!moradia.qualRegFundOuUsocapiao && moradia.qualRegFundOuUsocapiao.length > 0 ? this.programaContempladoPaisAtivo = true : this.programaContempladoPaisAtivo = false;
    !!moradia.aondeRegFundOuUsocapiao && moradia.aondeRegFundOuUsocapiao.length > 0 ? this.programaContempladoPaisAtivo = true : this.programaContempladoPaisAtivo = false;
    !!moradia.qualUnidBasicaSaude ? this.familiaAcessaUnidadeBasicaSaude = true : this.familiaAcessaUnidadeBasicaSaude = false;

    this.atualizaMoradia(String(moradia.tipoMoradia));
    this.formularioMoradiaValido.emit(this.formularioMoradia)
  }

  converterParaInteiro(valor: number | boolean): number {
    return valor ? 1 : 2
  }

  familiaAcessaUnidadeBasicaSaudeSelecionado(selecionado: number) {
    if (selecionado === 1) {
      this.familiaAcessaUnidadeBasicaSaude = true;
    } else {
      this.familiaAcessaUnidadeBasicaSaude = false;
      this.formularioMoradia.patchValue({ qualUnidBasicaSaude: "" })
    }
  }

  converterBooleanString(valorBooleano: boolean): string {
    if (valorBooleano) {
      return 'true'
    } else {
      return 'false'
    }
  }

  atualizaTotalDeDespesas(valorInfomado: string | number): void {
    if (typeof valorInfomado === 'string') {
      valorInfomado = Number(valorInfomado.replace(',', '.'))
    }
    const total = this.retornaValorNumerico(this.formularioMoradia.value.gastoComAluguel)
      + this.retornaValorNumerico(this.formularioMoradia.value.gastoComEnergiaEletrica)
      + this.retornaValorNumerico(this.formularioMoradia.value.gastoComAguaEsgoto)
      + this.retornaValorNumerico(this.formularioMoradia.value.gastoComGas)
      + this.retornaValorNumerico(this.formularioMoradia.value.gastoComAlimentacaoHigieneLimpeza)
      + this.retornaValorNumerico(this.formularioMoradia.value.gastoComMedicamento)
    this.formularioMoradia.patchValue({ totalDeDespesasMensais: total })
  }

  retornaValorNumerico(valorRecebido: undefined | number): number {
    const valor = !!valorRecebido ? valorRecebido : 0
    return valor
  }

  possuiImovelSelecionado(selecionado: number) {
    if (selecionado === 1) {
      this.localDoImovelAtivo = true;
    } else {
      this.localDoImovelAtivo = false;
      this.formularioMoradia.patchValue({ qualLocalDoImovel: "" })
    }
  }

  jaContempladoSelecionado(selecionado: number) {
    if (selecionado === 1) {
      this.programaContempladoAtivo = true
    } else {
      this.programaContempladoAtivo = false;
      this.formularioMoradia.patchValue({ qualProgHabitacional: "" })
    }
  }

  jaContempladoPaisSelecionado(selecionado: number) {
    if (selecionado === 1) {
      this.programaContempladoPaisAtivo = true
    } else {
      this.programaContempladoPaisAtivo = false;
      this.formularioMoradia.patchValue({ qualRegFundOuUsocapiao: "", aondeRegFundOuUsocapiao: "" })
    }
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

  atualizaMoradia(tipoMoradia: string): void {
    if (tipoMoradia === 'Alugada') {
      this.aluguelHabilitado = "false";
      this.aluguelObrigatorio = "true";
      this.poNotificationService.warning("Informe um valor para o aluguel!")
    } else {
      this.aluguelHabilitado = "true";
      this.aluguelObrigatorio = "false";
      this.formularioMoradia.patchValue({
        gastoComAluguel: ''
      });
      this.atualizaTotalDeDespesas(0);
    }
  }

  enviaFormulario(): void {

    if (this.formularioMoradia.get('desastreMoradia')?.value.length > 1 && this.formularioMoradia.get('desastreMoradia')?.value.find((valor: string) => valor === "NaoSofreu") !== undefined) {
      this.formularioMoradia.get('desastreMoradia')?.patchValue(['NaoSofreu'])
    }

    this.formularioMoradiaValido.emit(this.formularioMoradia)
  }

  ngOnDestroy() {
    this.subscriptionFormularioMoradia.unsubscribe();
  }
}

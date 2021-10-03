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
  public numeroAutomoveiOpcoes: Array<PoSelectOption>;
  public desastresOpcoes: Array<PoSelectOption>;
  public usoMoradiaOpcoes: Array<PoSelectOption>;
  public familiaAcessaUnidadeBasicaSaude = false;
  public acessoInternet = true;
  public carregando = false;

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

    this.moradiaService.getMoradiabyTitular(String(sessionStorage.getItem('idTitular'))).pipe(
      take(1),
  finalize(() => this.carregando = true)
    ).subscribe(
      res => { sessionStorage.setItem('moradiaID', res.id), this.montaFormularioEdicao(res) },
      error => console.log(error)
    )
  }

  criaFormulario(): void {
    this.formularioMoradia = this.fb.group({
      titularId: [String(sessionStorage.getItem('idTitular'))],
      assentamento: ['-'],
      numeroSelagemAtual: [''],
      numeroSelagemAntiga: [''],
      endereco: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cadastroUnicoFamilia: ['', Validators.compose([Validators.required])],
      acessaUnidBasicaSaude: ['', Validators.compose([Validators.required])],
      qualUnidBasicaSaude: [''],
      temAcessoEscolaCreche: ['', Validators.compose([Validators.required])],
      utilizaTransporteEscolar: ['', Validators.compose([Validators.required])],
      acessaCras: ['', Validators.compose([Validators.required])],
      acessaCreas: ['', Validators.compose([Validators.required])],
      acessaServConvivenciaCriancaAdolescente: ['', Validators.compose([Validators.required])],
      acessaServConvivenciaCriancaIdoso: ['', Validators.compose([Validators.required])],
      tipoMoradia: ['', Validators.compose([Validators.required])],
      quantidadeBanheiro: ['', Validators.compose([Validators.required])],
      quantidadeComodo: ['', Validators.compose([Validators.required])],
      tipoMoradiaOcupada: ['', Validators.compose([Validators.required])],
      caracteristicaMoradia: ['', Validators.compose([Validators.required])],
      acessoEnergiaEletrica: ['', Validators.compose([Validators.required])],
      acessoAbastecimentoAgua: ['', Validators.compose([Validators.required])],
      acessoSaneamentoSanitario: ['', Validators.compose([Validators.required])],
      possuiAutomovel: ['', Validators.compose([Validators.required])],
      moradiaSofreuDesastre: ['', Validators.compose([Validators.required])],
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

    });

    this.subscriptionFormularioMoradia = this.formularioMoradia.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(res => this.telaIniciada ? this.formularioMoradiaValido.emit(this.formularioMoradia) : this.telaIniciada = true)

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
      possuiAutomovel: moradia.possuiAutomovel,
      moradiaSofreuDesastre: moradia.moradiaSofreuDesastre,
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
    });

    !!moradia.qualUnidBasicaSaude ? this.familiaAcessaUnidadeBasicaSaude = true : this.familiaAcessaUnidadeBasicaSaude = false;

    this.formularioMoradiaValido.emit(this.formularioMoradia)
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
    if(typeof valorInfomado === 'string'){
      valorInfomado = Number(valorInfomado.replace(',', '.'))
    }
    const total =  this.retornaValorNumerico(this.formularioMoradia.value.gastoComAluguel)
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

  ngOnDestroy() {
    this.subscriptionFormularioMoradia.unsubscribe();
  }
}

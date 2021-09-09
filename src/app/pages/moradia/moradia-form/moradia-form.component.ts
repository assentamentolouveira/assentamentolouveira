import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PoNotificationService, PoSelectOption, PoComboOption } from '@po-ui/ng-components';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { OpcoesComboService } from 'src/app/shared/services/opcoes-combo.service';
import { MoradiaService } from '../shared/moradia.service';
import { Moradias } from '../shared/moradias.model';

@Component({
  selector: 'app-moradia-form',
  templateUrl: './moradia-form.component.html',
  styleUrls: ['./moradia-form.component.css'],
})
export class MoradiaFormComponent extends BaseResourceFormComponent<Moradias> implements OnDestroy {

  public formularioMoradia: FormGroup;

  public familiaTemCadastroUnico: Array<PoSelectOption>;
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


  constructor(    protected injector: Injector,
    private poNotificationService: PoNotificationService,
    private opcoesComboService: OpcoesComboService,
    private moradiaService: MoradiaService,
    private fb: FormBuilder,
  ) {
    super(injector, new Moradias(), moradiaService)
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
  }

  initialize(): void {
    this.familiaTemCadastroUnico = this.opcoesComboService.familiaTemCadastroUnicoOpcoes;
    this.boleanoOpcoes = this.opcoesComboService.boleanoOpcoes;
    this.moradiaOpcoes = this.opcoesComboService.moradiaOpcoes;
    this.quantidadeBanheirosOpcoes = this.opcoesComboService.quantidadeBanheirosOpcoes;
    this.quantidadeComodosOpcoes = this.opcoesComboService.quantidadeComodosOpcoes;
    this.tipoMoradiaOpcoes  = this.opcoesComboService.tipoMoradiaOpcoes;
    this.caracteristicasCasaOpcoes = this.opcoesComboService.caracteristicasCasaOpcoes;
    this.acessoEnergiaOpcoes = this.opcoesComboService.acessoEnergiaOpcoes;
    this.acessoAguaOpcoes = this.opcoesComboService.acessoAguaOpcoes;
    this.acessoSaneamentoOpcoes = this.opcoesComboService.acessoSaneamentoOpcoes;
    this.numeroAutomoveiOpcoes = this.opcoesComboService.numeroAutomoveiOpcoes;
    this.desastresOpcoes = this.opcoesComboService.desastresOpcoes;
    this.usoMoradiaOpcoes = this.opcoesComboService.usoMoradiaOpcoes;

  }

  ngOnDestroy(){

  }
}

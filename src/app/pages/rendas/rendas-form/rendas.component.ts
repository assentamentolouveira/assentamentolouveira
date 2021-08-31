import { RendasService } from './../shared/rendas.service';
import { OpcoesComboService } from 'src/app/shared/services/opcoes-combo.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoComboOption, PoSelectOption, PoTableColumn, PoNotificationService, PoTableAction } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { Renda } from '../shared/renda.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-rendas',
  templateUrl: './rendas.component.html',
  styleUrls: ['./rendas.component.css']
})
export class RendasComponent implements OnInit, OnDestroy, OnChanges {
  public formularioRendas: FormGroup;
  public rendaOpcoes: Array<PoSelectOption>;
  public iconeBotao = "po-icon-plus-circle"
  public legendaBotao = "Adicionar Renda"
  public colunas: PoTableColumn[];
  public listaRendas: Renda[];
  public edicao: boolean = false;
  public classSalvar = "po-sm-12 po-lg-2 po-xl-2 po-offset-lg-10 po-offset-xl-10"

  public acoes: Array<PoTableAction> = [
    {
      icon: 'po-icon-edit',
      label: 'Editar',
      action: this.editarRendas.bind(this)
    }

  ];


  private subscription: Subscription;

  @Input() comboRenda: any

  @Input() valorRenda: number;
  @Input() tipoRenda: string;

  @Output() atualizaRenda: EventEmitter<any> = new EventEmitter();;

  constructor(private fb: FormBuilder,
    private opcoesComboService: OpcoesComboService,
    private rendasService: RendasService,
    private poNotificationService: PoNotificationService) {
    this.initialize();
    this.colunas = this.rendasService.getColunas()
  }

  ngOnInit() {
    this.criaFormulario();
    this.subscription = this.formularioRendas.valueChanges.subscribe(
      () => this.formularioRendas.valid ? this.atualizaRenda.emit(this.formularioRendas.value) : false
    );
  }

  criaFormulario(): void {
    this.formularioRendas = this.fb.group({
      id:[''],
      dependenteId:[''],
      titularId:[sessionStorage.getItem('idTitular')],
      valor: [this.valorRenda, Validators.compose([Validators.required])],
      tipo: [this.tipoRenda, Validators.compose([Validators.required])],
      responsavelRenda: [this.tipoRenda, Validators.compose([Validators.required])]
    });
  }

  initialize(): void {
    this.edicao = false;
    this.rendaOpcoes = this.opcoesComboService.rendaOpcoes;
    this.rendasService.getRendasById().pipe(
      take(1)
    ).subscribe(rendas => {
      rendas.map(renda => {
        renda.descricaoRenda = this.opcoesComboService.retornaLabelOpcoes(renda.tipo, this.rendaOpcoes)
        renda.responsavelRenda = this.opcoesComboService.retornaLabelOpcoes(renda.dependenteId ? renda.dependenteId : renda.titularId, this.comboRenda);
      });
      this.listaRendas = rendas
    }
      , error => this.poNotificationService.error("Erro ao consultar as Rendas"))
  }

  editarRendas(rendaSelecionada: Renda): void {
    this.iconeBotao = "po-icon-edit"
    this.legendaBotao = "Editar Renda"
    this.classSalvar = "po-sm-12 po-lg-2 po-xl-2"

    console.log(rendaSelecionada)
    this.edicao = true;
    this.formularioRendas.patchValue({
      id: rendaSelecionada.id,
      titularId:sessionStorage.getItem('idTitular'),
      dependenteId: rendaSelecionada.dependenteId,
      valor: rendaSelecionada.valor,
      tipo: rendaSelecionada.tipo,
      responsavelRenda: rendaSelecionada.responsavelRenda,
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.comboRenda) {
      this.comboRenda = changes.comboRenda.currentValue;
    }
  }

  cancelaEdicao(): void {
    this.classSalvar = "po-sm-12 po-lg-2 po-xl-2 po-offset-lg-10 po-offset-xl-10";
    this.legendaBotao = "Adicionar Renda"
    this.edicao = false;
  }

  incluirEditarRenda(): void {
    if (this.formularioRendas.valid) {
      if (this.edicao) {
        this.rendasService.alterarRenda(this.formularioRendas.value).subscribe(
          res => this.initialize(),
          error=> console.log(error)
        );
      } else {
        this.rendasService.criarRenda((this.formularioRendas.value));
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

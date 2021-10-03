import { TitularesService } from './../../titulares/shared/titulares.service';
import { RendasService } from './../shared/rendas.service';
import { OpcoesComboService } from 'src/app/shared/services/opcoes-combo.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoComboOption, PoSelectOption, PoTableColumn, PoNotificationService, PoTableAction, PoDialogService, PoInfoOrientation } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { Renda } from '../shared/renda.model';
import { take, finalize } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DependentesService } from '../../dependentes/shared/dependentes.service';
import { Titular } from '../../titulares/shared/titular.model';

@Component({
  selector: 'app-rendas',
  templateUrl: './rendas.component.html',
  styleUrls: ['./rendas.component.css']
})
export class RendasComponent implements OnInit, OnDestroy {
  public formularioRendas: FormGroup;
  public rendaOpcoes: Array<PoSelectOption>;
  public iconeBotao = "po-icon-plus-circle"
  public legendaBotao = "Adicionar Renda"
  public colunas: PoTableColumn[];
  public listaRendas: Renda[];
  public edicao: boolean = false;
  public classSalvar = "po-sm-12 po-lg-2 po-xl-2 po-offset-lg-10 po-offset-xl-10";
  public poInfoOrientation: PoInfoOrientation = PoInfoOrientation.Horizontal;
  public somaRenda = 0;

  public realizandoAlteracaoAlteracao = false;
  public habilitaConfirmacao = false;
  public isDesktop = true;
  public carregando = false
  public comboRenda: PoSelectOption[]

  public acoes: Array<PoTableAction> = [
    {
      icon: 'po-icon-edit',
      label: 'Editar',
      action: this.editarRendas.bind(this)
    },
    {
      icon: 'po-icon-close',
      label: 'Excluir',
      action: this.confirmaExclusao.bind(this)
    }

  ];


  private subscription: Subscription;


  @Input() valorRenda: number;
  @Input() tipoRenda: string;

  @Output() atualizaRenda: EventEmitter<any> = new EventEmitter();;

  constructor(private fb: FormBuilder,
    private opcoesComboService: OpcoesComboService,
    private rendasService: RendasService,
    private poNotificationService: PoNotificationService,
    private poAlert: PoDialogService,
    private dependentesService: DependentesService,
    private titularesService: TitularesService,
    private deviceService: DeviceDetectorService) {
    this.initialize();
    this.colunas = this.rendasService.getColunas()
    this.isDesktop = this.deviceService.isDesktop();
  }

  ngOnInit() {
    this.criaFormulario();
    this.subscription = this.formularioRendas.valueChanges.subscribe(
      () => {
        if (this.formularioRendas.valid) {
          this.habilitaConfirmacao = this.formularioRendas.valid;
          this.atualizaRenda.emit(this.formularioRendas.value)
        }
      }
    );
  }

  criaFormulario(): void {
    this.formularioRendas = this.fb.group({
      id: [''],
      dependenteId: [''],
      titularId: [sessionStorage.getItem('idTitular')],
      valor: [this.valorRenda, Validators.compose([Validators.required])],
      tipo: [this.tipoRenda, Validators.compose([Validators.required])],
      responsavelRenda: [this.tipoRenda, Validators.compose([Validators.required])]
    });
  }

  initialize(): void {
    const dadosTitular: Titular = JSON.parse(this.titularesService.getTitularInfo());
    this.somaRenda = 0;
    this.edicao = false;
    this.defineClasseBotaoSalvar(true);
    this.formularioRendas?.reset();
    this.rendaOpcoes = this.opcoesComboService.rendaOpcoes;
    this.realizandoAlteracaoAlteracao = true;
    this.listaRendas = [];
    this.comboRenda = [{ label: dadosTitular.nomeResponsavel, value: dadosTitular.id }]
    this.dependentesService.getDepentendesPorTitularComCartaoCidadao(String(sessionStorage.getItem('idTitular'))).pipe(
      finalize(() => this.buscaRendaPorTitular())
    ).subscribe(
      res => {
        res.map(dependente => {
          this.comboRenda.push({ label: String(dependente.Nome), value: dependente.id })
        });
      },
      error => this.carregando = true
    )
  }

  buscaRendaPorTitular(): void {
    this.rendasService.getRendasById(String(sessionStorage.getItem('idTitular'))).pipe(
      take(1),
      finalize(() => {this.carregando = true; this.realizandoAlteracaoAlteracao = false})
    ).subscribe(rendas => {
      rendas.map(renda => {
        this.somaRenda += renda.valor;
        renda.descricaoRenda = this.opcoesComboService.retornaLabelOpcoes(renda.tipo, this.rendaOpcoes)
        renda.responsavelRenda = this.opcoesComboService.retornaLabelOpcoes(renda.dependenteId ? renda.dependenteId : renda.titularId, this.comboRenda);
      });
      this.listaRendas = rendas
    }
      , error => {
        if (error.status != 404) {
          this.poNotificationService.error("Erro ao buscar a Renda")
        }
        this.carregando = true
      })
  }

  defineClasseBotaoSalvar(valorDefault: boolean): void {
    if (valorDefault) {
      this.legendaBotao = "Adicionar Renda"
      this.classSalvar = "po-sm-12 po-lg-2 po-xl-2 po-offset-lg-10 po-offset-xl-10 po-mb-2"
    } else {
      this.legendaBotao = "Editar Renda";
      this.classSalvar = "po-sm-12 po-lg-2 po-xl-2 po-mb-2"
    }
  }
  editarRendas(rendaSelecionada: Renda): void {
    this.iconeBotao = "po-icon-edit"
    this.defineClasseBotaoSalvar(false);

    this.edicao = true;
    this.formularioRendas.patchValue({
      id: rendaSelecionada.id,
      titularId: sessionStorage.getItem('idTitular'),
      dependenteId: rendaSelecionada.dependenteId,
      valor: rendaSelecionada.valor,
      tipo: rendaSelecionada.tipo,
      responsavelRenda: rendaSelecionada.dependenteId ? rendaSelecionada.dependenteId : rendaSelecionada.titularId,
    })
  }

  confirmaExclusao(rendaSelecionada: Renda): void {
    this.poAlert.confirm({
      literals: { cancel: "Cancelar", confirm: "Confirmar" },
      title: "Confirmação de Exclusão",
      message: "Deseja realmente excluir a renda selecionada?",
      confirm: () => this.excluiRenda(String(rendaSelecionada.id))
    });
  }

  excluiRenda(id: string): void {
    this.rendasService.excluirRenda(id).subscribe(
      res => {
        this.poNotificationService.success("Renda Excluída com Sucesso");
        this.initialize()
      }
      , error => {
        this.poNotificationService.error("Erro ao excluir a renda");
      }
    );
  }

  cancelaEdicao(): void {
    this.defineClasseBotaoSalvar(true);
    this.formularioRendas.reset();
    this.habilitaConfirmacao = false;
    this.edicao = false;
  }

  incluirEditarRenda(): void {
    if (this.formularioRendas.valid) {
      this.habilitaConfirmacao = false;
      this.realizandoAlteracaoAlteracao = true;
      this.formularioRendas.patchValue({ titularId: sessionStorage.getItem('idTitular') })
      if (this.edicao) {
        this.rendasService.alterarRenda(this.formularioRendas.value).
          pipe(
            finalize(() => this.realizandoAlteracaoAlteracao = false)
          ).subscribe(
            res => {
              this.poNotificationService.success("Renda Editada com Sucesso");
              this.initialize()
            }
            , error => { this.poNotificationService.error("Erro ao Alterar uma renda"); }
          );
      } else {
        this.rendasService.criarRenda(this.formularioRendas.value).
          pipe(
            finalize(() => this.realizandoAlteracaoAlteracao = false)
          ).subscribe((res) => {
            this.poNotificationService.success("Renda Incluida com Sucesso");
            this.initialize()
          }
            , error => { this.poNotificationService.error("Erro ao incluir uma renda"); }
          );
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

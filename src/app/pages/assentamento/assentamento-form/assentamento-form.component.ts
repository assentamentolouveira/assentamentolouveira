import { RendasService } from './../../rendas/shared/rendas.service';
import { OpcoesComboService } from './../../../shared/services/opcoes-combo.service';
import { MoradiaService } from './../../moradia/shared/moradia.service';
import { DependentesService } from './../../dependentes/shared/dependentes.service';
import { Dependente } from './../../dependentes/shared/dependente.model';
import { TitularesService } from './../../titulares/shared/titulares.service';
import { PoButtonGroupItem, PoPageAction, PoNotificationService, PoComboOption, PoStepperComponent, PoDialogService } from '@po-ui/ng-components';
import { LoginService } from './../../../core/login/shared/login.service';
import { NavigationExtras, Router } from '@angular/router';
import { AssentamentoService } from './../shared/assentamento.service';
import { Assentamento } from './../shared/assentamento.model';
import { Component, Injector, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Titular } from '../../titulares/shared/titular.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { take, finalize, retry } from 'rxjs/operators';
import { forkJoin, Subscription } from 'rxjs';
import { DocumentPipe } from 'src/app/shared/pipes/document.pipe';
import { Moradia } from '../../moradia/shared/moradia.model';

@Component({
  selector: 'app-assentamento-form',
  templateUrl: './assentamento-form.component.html',
  styleUrls: ['./assentamento-form.component.css'],
})
export class AssentamentoFormComponent extends BaseResourceFormComponent<Assentamento> implements OnDestroy {

  @ViewChild('stepper') stepper: PoStepperComponent;

  public actions: Array<PoPageAction> = [
    {
      label: 'Prosseguir',
      action: () => this.proximoStepper(this),
      icon: 'po-icon-arrow-right'
    },
  ];

  public stepperSelecionado: string;
  public isTitular = true;
  public isDependente = false;
  public isMoradia = false;
  public isRenda = false;
  public carregando = true;
  public mensagemLoading = ''
  public habilitaRenda = false;
  public titularValido = false;
  public edicao = false;
  public atualizaDepentente = false;
  public formularioTitular: FormGroup;
  public formularioMoradia: FormGroup;
  public formularioTitularValido = false;
  public formularioMoradiaValido = false;


  private titular: Titular;
  private dependentes: Dependente[];
  private subscribeStepper: Subscription;
  private isDependenteValido: boolean = false;

  public comboRenda: PoComboOption[] = [];

  botoes: Array<PoButtonGroupItem> = [
    {
      label: 'Titular',
      action: () => this.defineFormulario(true, false, false, false, 1),
      selected: true,
      icon: 'po-icon-user'
    },
    {
      label: 'Dependente',
      action: () => this.defineFormulario(false, true, false, false, 2),
      selected: false,
      disabled: !this.edicao,
      icon: 'po-icon-users'
    },
    {
      label: 'Moradia',
      action: () => this.defineFormulario(false, false, true, false, 3),
      selected: false,
      disabled: !this.edicao,
      icon: 'po-icon-warehouse'
    },
    {
      label: 'Renda',
      action: () => this.defineFormulario(false, false, false, true, 4),
      selected: false,
      disabled: !this.edicao,
      icon: 'po-icon-finance'
    },
  ];

  constructor(
    protected assentamentoService: AssentamentoService,
    protected injector: Injector,
    private poNotificationService: PoNotificationService,
    private loginService: LoginService,
    private titularService: TitularesService,
    private rendaService: RendasService,
    private dependentesService: DependentesService,
    private moradiaService: MoradiaService,
    private poAlert: PoDialogService,
    private opcoesComboService: OpcoesComboService
  ) {
    super(injector, new Assentamento(), assentamentoService);
    this.actions.push({
      label: 'Retornar',
      action: () => this.retornarStepper(),
      icon: 'po-icon-arrow-left',
    });
    if (this.loginService.isInternet) {
      this.actions.push({
        label: 'Sair',
        action: () => this.router.navigate(['/internet/login']),
        icon: 'po-icon-exit',
      });
    } else {
      this.actions.push({
        label: 'Voltar',
        action: () => this.router.navigate(['/intranet/titulares']),
        icon: 'po-icon-exit',
      });
    }
    this.edicao = this.router.url.includes('editar')
    this.titularValido = this.edicao;
    this.botoes.map((botao, indice) => {
      this.botoes[indice].disabled = !this.edicao;
    });

    this.poNotificationService.setDefaultDuration(3000);

    if (this.route.snapshot.queryParamMap.get('inclusao')) {
      this.stepper?.next();
    }
    // if (this.loginService.getCPFUsuario() !== this.route.snapshot.paramMap.get('id')){
    //   this.router.navigate(['/internet/login'])
    // }

  }

  defineFormulario(
    isTitular: boolean,
    isDependente: boolean,
    isMoradia: boolean,
    isRenda: boolean,
    opcaoSelecionada: number
  ) {
    this.isTitular = isTitular;
    this.isDependente = isDependente;
    this.isMoradia = isMoradia;
    this.isRenda = isRenda;
    this.botoes.map((botao, indice) => {
      indice + 1 === opcaoSelecionada
        ? (this.botoes[indice].selected = true)
        : (this.botoes[indice].selected = false);
    });
  }

  titularInfomadoValido(): boolean {
    // if (this.subscribeStepper === undefined) {
    //   this.subscribeStepper = this.stepper.onChangeStep.subscribe(a => console.log('teste', a))
    // }
    if (!this.formularioTitularValido) {
      this.poNotificationService.error("Preencha todos os campos de Gênero, Raça/Etnia e Escolaridade para habilitar a opção de Dependentes")
    } else {
      this.salvarEdicaoTitular()
    }
    return this.formularioTitularValido
  }

  dependenteValido(): boolean {
    if (!this.isDependenteValido) {
      this.poNotificationService.error("Informe um dependente ou defina que não possui dependentes.")
    }
    return this.isDependenteValido
  }

  moradiaValido(): boolean {
    this.habilitaRenda = false;
    this.habilitaRenda = this.formularioMoradia === undefined ? false : this.formularioMoradia.valid;
    if (!this.habilitaRenda) {
      this.poNotificationService.error("Preencha todos os campos da Moradia para Habilitar as Rendas")
    } else {
      this.salvarEdicaoMoradia()
    }
    return this.habilitaRenda
  }
  recebeFormularioTitular(formularioValido: FormGroup): void {
    this.formularioTitular = formularioValido;
    this.formularioTitularValido = formularioValido.valid;
  }

  salvarEdicaoTitular(): boolean {
    this.titular = JSON.parse(this.titularService.getTitularInfo());
    if (this.formularioTitular.valid) {
      this.carregando = false;
      this.edicao ? this.editaTitular(this.formularioTitular.value) : this.incluiTitular(this.formularioTitular.value)
    }
    this.titular = this.formularioTitular.value;
    return this.formularioTitular.valid
  }

  editaTitular(formulario: Titular): void {
    this.mensagemLoading = "Alterando Titular...";
    this.titularService.alterarTitular(formulario).pipe(
      take(1),
      finalize(() => { this.carregando = true })
    ).subscribe(res => {
      this.titularValido = true;
      this.titularService.setTitularInfo(res);
      this.poNotificationService.success("Titular editado com sucesso")
    }, error => this.poNotificationService.error(error.message))
  }

  incluiTitular(formulario: Titular): void {
    this.mensagemLoading = "Incluindo Titular...";
    this.titularService.criarTitular(formulario).pipe(
      take(1),
    ).subscribe(res => {
      this.titularService.setTitularInfo(res)
      this.botoes.map((botao, indice) => {
        this.botoes[indice].disabled = false;
      });
      const navigationExtras: NavigationExtras = {
        queryParams: { 'inclusao': true },
      };

      this.poNotificationService.success("Titular incluído com sucesso!")
      this.edicao = true;
      this.carregando = true;
      this.titularValido = true;
      //this.loginService.isInternet ? this.router.navigate([`/internet/${this.loginService.getCPFUsuario()}/editar/`], navigationExtras) : this.router.navigate([`/intranet/titulares/${this.loginService.getCPFUsuario()}/editar/`]);

      // this.edicao = true;

      // const dadosTitular = JSON.parse(this.titularService.getTitularInfo());
      // const listaDeDepententes = dadosTitular.dependentes.split(',');

      // if (listaDeDepententes.length > 0) {
      //   this.incluiDependentes(listaDeDepententes, res);
      // } else {
      //   this.carregando = true;
      //   this.titularValido = true;
      // }
    }
      , error => {
        this.carregando = true;
        this.titularValido = false;
        this.poNotificationService.error(error.message)
        this.retornarStepper();
        console.error(error)
      })

  }

  recebeDependentes(dependentes: any): void {
    const isDependenteValido = dependentes.isDependenteValido;
    this.dependentes = dependentes.dependentes;
    if (this.dependentes.length > 0 || isDependenteValido) {
      this.isDependenteValido = true;
    } else {
      this.isDependenteValido = false;
    }
    // this.montaComboRenda();
  }

  converteParentesco(dependente: Dependente): string {
    return this.opcoesComboService.retornaLabelOpcoes(dependente.grauParentesco, this.opcoesComboService.parentescoOpcoes)
  }


  montaComboRenda(): void {
    const dadosTitular = JSON.parse(this.titularService.getTitularInfo());
    this.comboRenda = [];
    this.comboRenda.push({ value: String(sessionStorage.getItem('idTitular')), label: dadosTitular.nomeResponsavel })
    this.dependentes?.map(dependente => this.comboRenda.push({ value: dependente.id, label: dependente.nome }));
  }

  recebeFormularioMoradia(formularioMoradia: FormGroup): void {
    this.formularioMoradia = formularioMoradia;
    this.formularioMoradiaValido = formularioMoradia.valid;
  }

  salvarEdicaoMoradia(): void {
    if (this.formularioMoradia.valid) {
      const formularioMoradia: any = {};

      for (let key in this.formularioMoradia.value) {
        if (this.formularioMoradia.value[key]) {
          formularioMoradia[key] = this.formularioMoradia.value[key];
        }
      }

      this.formularioMoradia.value
      this.mensagemLoading = "Alterando Moradia...";
      this.carregando = false;

      if (sessionStorage.getItem('moradiaID') && String(sessionStorage.getItem('moradiaID'))?.length > 0) {
        this.editaMoradia(formularioMoradia);
      } else {
        this.incluiMoradia(formularioMoradia);
      }
    }
  }

  editaMoradia(formularioMoradia: Moradia): void {
    this.moradiaService.putMoradia(JSON.parse(JSON.stringify(formularioMoradia)), String(sessionStorage.getItem('moradiaID'))).pipe(
      finalize(() => { this.carregando = true })
    ).subscribe(
      res => { this.poNotificationService.success("Moradia Editada com Sucesso"), this.stepper.next() },
      error => { this.poNotificationService.error("Erro ao Editar a Moradia: " + error.message), this.retornarStepper() },
    )
  }

  incluiMoradia(formularioMoradia: Moradia): void {
    this.moradiaService.postMoradia(JSON.parse(JSON.stringify(formularioMoradia))).pipe(
      finalize(() => { this.carregando = true })
    ).subscribe(
      res => {
        this.poNotificationService.success("Moradia Incluída com Sucesso"), sessionStorage.setItem('moradiaID', res.id), this.stepper.next()
      },
      error => { this.poNotificationService.error("Erro ao Editar a Moradia: " + error.message), this.retornarStepper() },
    )
  }

  proximoStepper(a: any): void {
    if (this.stepperSelecionado === 'Titular') {
      this.stepper.next();
    } else if (this.stepperSelecionado === 'Dependentes') {
      this.stepper.next();
    } else if (this.stepperSelecionado === 'Moradia') {
      this.stepper.next();
    } else if (this.stepperSelecionado === 'Rendas') {
      this.poAlert.confirm({
        literals: { confirm: 'Salvar', cancel: 'Fechar' },
        title: 'Confirmação de Cadastro',
        message: "Confirma o cadastro da solicitação de moradia?",
        //        confirm: () => (this.confirmaSolicitacaoDeMoradia()),
        confirm: () => (this.validaRenda()),
        cancel: () => ('')
      });
    }
  }

  validaRenda(): void {
    this.rendaService.getRendasById(String(sessionStorage.getItem('idTitular'))).subscribe(
      res => {
        if (res.length <= 0) {
          this.poNotificationService.error("Informe pelo menos uma renda para finalizar o cadastro")
        } else {
          this.confirmaSolicitacaoDeMoradia()
        }
      },
      error => { this.poNotificationService.error("Informe pelo menos uma renda para finalizar o cadastro") }
    )
  }

  confirmaSolicitacaoDeMoradia(): void {
    this.mensagemLoading = "Atualizando Solicitação...";
    this.carregando = false;
    this.assentamentoService.getAssentamentoPorTitular(String(sessionStorage.getItem('idTitular'))).subscribe(
      res => {
        this.assentamentoService.alteraAssentamento(String(sessionStorage.getItem('moradiaID')), String(sessionStorage.getItem('idTitular')), res.id).pipe(
          finalize(() => this.carregando = true)
        ).subscribe(
          res => {
            this.poAlert.alert({
              literals: { ok: 'Ok' },
              title: 'Sucesso',
              message: "Seu Cadastro na SIMHAB foi concluído com Sucesso", //Entre em contato com a FUMHAB e agende uma data para entrega dos documentos comprobatórios <br><br>  <b>Telefone: (19) 3878-1960</b>
            });
          },
          error => {
            this.poNotificationService.error("Ocorreu um erro na gravação da solicitação: " + error.message)
          }
        )
      }
      , error => {
        this.assentamentoService.gravaAssentamento(String(sessionStorage.getItem('moradiaID')), String(sessionStorage.getItem('idTitular'))).pipe(
          finalize(() => this.carregando = true)
        ).subscribe(
          res => {
            this.poAlert.alert({
              literals: { ok: 'Ok' },
              title: 'Seu Cadastro na SIMHAB foi concluído com Sucesso',
              message: "Os documentos comprobatórios serão fornecidos na época da realização do empreendimento <br><br>  <b>Telefone: (19) 3878-1960</b>",
            });
          },
          error => {
            this.poNotificationService.error("Ocorreu um erro na gravação da solicitação: " + error.message)
          }
        )
      }
    )
  }

  retornarStepper(): void {
    if (this.stepperSelecionado != 'Titular') {
      this.stepper.previous();
    }
  }

  mudaStap(stapEvent: any): void {
    switch (stapEvent.label) {
      case 'Titular':
        this.actions[0].label = "Prosseguir para Dependentes"
        this.actions[0].icon = 'po-icon-arrow-right'
        break;
      case 'Dependentes':
        this.actions[0].label = "Prosseguir para Moradia"
        this.actions[0].icon = 'po-icon-arrow-right'
        break;
      case 'Moradia':
        this.actions[0].label = "Prosseguir para Rendas"
        this.actions[0].icon = 'po-icon-arrow-right'
        break;
      default:
        this.actions[0].label = "Salvar Cadastro"
        this.actions[0].icon = 'po-icon-ok'
        break;
    }
    this.stepperSelecionado = stapEvent.label
  }

  ngOnDestroy(): void {
    // this.subscribeStepper.unsubscribe()
  }

  protected buildResourceForm(): void { }

  protected creationPageTitle(): string {
    return 'Cadastro de ';
  }

  protected editionPageTitle(): string {
    const dadosTitular = JSON.parse(this.titularService.getTitularInfo());
    return 'Editando dados de ' + dadosTitular.nome
  }

}

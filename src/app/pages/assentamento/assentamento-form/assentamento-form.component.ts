import { OpcoesComboService } from './../../../shared/services/opcoes-combo.service';
import { MoradiaService } from './../../moradia/shared/moradia.service';
import { DependentesService } from './../../dependentes/shared/dependentes.service';
import { Dependente } from './../../dependentes/shared/dependente.model';
import { TitularesService } from './../../titulares/shared/titulares.service';
import { PoButtonGroupItem, PoPageAction, PoNotificationService, PoComboOption } from '@po-ui/ng-components';
import { LoginService } from './../../../core/login/shared/login.service';
import { Router } from '@angular/router';
import { AssentamentoService } from './../shared/assentamento.service';
import { Assentamento } from './../shared/assentamento.model';
import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Titular } from '../../titulares/shared/titular.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { take, finalize, retry } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { DocumentPipe } from 'src/app/shared/pipes/document.pipe';
import { Moradia } from '../../moradia/shared/moradia.model';

@Component({
  selector: 'app-assentamento-form',
  templateUrl: './assentamento-form.component.html',
  styleUrls: ['./assentamento-form.component.css'],
})
export class AssentamentoFormComponent extends BaseResourceFormComponent<Assentamento> {
  public readonly actions: Array<PoPageAction> = [
    { label: 'Salvar Solicitação de Moradia', action: () => alert('Salvar'), icon: 'po-icon-ok' },
  ];

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


  private titular: Titular;
  private dependentes: Dependente[];

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
      icon: 'po-icon-warehouse'
    },
  ];

  constructor(
    protected assentamentoService: AssentamentoService,
    protected injector: Injector,
    private poNotificationService: PoNotificationService,
    private loginService: LoginService,
    private titularService: TitularesService,
    private dependentesService: DependentesService,
    private moradiaService: MoradiaService,
    private opcoesComboService: OpcoesComboService
  ) {
    super(injector, new Assentamento(), assentamentoService);
    if (this.loginService.isInternet) {
      this.actions.push({
        label: 'Sair',
        action: () => this.router.navigate(['/internet/login']),
        icon: 'po-icon-exit',
      });
    }
    this.edicao = this.router.url.includes('editar')
    this.titularValido = this.edicao;
    this.botoes.map((botao, indice) => {
      this.botoes[indice].disabled = !this.edicao;
    });
    this.poNotificationService.setDefaultDuration(3000);
    this.buscaDependentesPorTitular();
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

  dependenteValido(): boolean {
    if (!this.titularValido) {
      this.poNotificationService.error("Salva os Dados do Titular para Habilitar os Dependentes")
    }
    return this.titularValido
  }

  formularioTitularValido(formularioValido: FormGroup): void {
    this.formularioTitular = formularioValido;
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
    ).subscribe(res => this.titularValido = true, error => console.error(error))
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

      this.edicao = true;

      const dadosTitular = JSON.parse(this.titularService.getTitularInfo());
      const listaDeDepententes = dadosTitular.dependentes.split(',');

      if (listaDeDepententes.length > 0) {
        this.incluiDependentes(listaDeDepententes, res);
      } else {
        this.carregando = true;
        this.titularValido = true;
      }
    }
      , error => {
        this.carregando = true;
        this.titularValido = false;
        this.poNotificationService.error(error.message)
        console.error(error)
      })

  }

  recebeDependentes(dependentes: any): void {
    this.dependentes = dependentes;
    this.montaComboRenda();
  }


  incluiDependentes(listaDeDepententes: string[], titular: Titular): void {
    let observablesDependentes = {};

    this.mensagemLoading = "Incluindo Dependentes...";
    this.titularValido = false;
    listaDeDepententes.forEach((dependente) => {
      Object.assign(observablesDependentes, { [dependente]: this.dependentesService.incluiDependente(titular.id, dependente).pipe(retry(3)) })
    })

    forkJoin(observablesDependentes).pipe(
      finalize(() => this.carregando = true)
    ).subscribe(
      res => {
        this.buscaDependentesPorTitular();
        this.titularValido = true;
      }
      , erro => console.error(`erro ao cadastrar dependente. Tente novamente ${erro}`)
    )
  }

  buscaDependentesPorTitular() {
    if (String(sessionStorage.getItem('idTitular'))?.length > 0) {
      this.dependentesService.getDepentendesPorTitular(sessionStorage.getItem('idTitular')).pipe(
        retry(3),
        take(1),
      ).subscribe(resposta => {
        const pipeCPF = new DocumentPipe()
        resposta.map(res => { res.parentesco = this.converteParentesco(res), res.cpfFormatado = pipeCPF.transform(res.numeroCpf) })
        this.recebeDependentes(resposta);
      }, error => {
        if (error.status != 404) {
          this.poNotificationService.error("Erro ao buscar a dependentes")
        }
      })
    }
  }

  converteParentesco(dependente: Dependente): string {
    return this.opcoesComboService.retornaLabelOpcoes(dependente.parentesco, this.opcoesComboService.parentescoOpcoes)
  }


  montaComboRenda(): void {
    const dadosTitular = JSON.parse(this.titularService.getTitularInfo());
    this.comboRenda = [];
    this.comboRenda.push({ value: String(sessionStorage.getItem('idTitular')), label: dadosTitular.nomeResponsavel })
    this.dependentes?.map(dependente => this.comboRenda.push({ value: dependente.id, label: dependente.nome }));

    this.habilitaRenda = true;
    console.log("combo Renda", this.comboRenda)
  }

  formularioMoradiaValido(formularioMoradia: FormGroup): void {
    this.formularioMoradia = formularioMoradia;
  }

  salvarEdicaoMoradia(): void {
    if (this.formularioMoradia.valid) {
      const formularioMoradia = this.formularioMoradia.value
      this.mensagemLoading = "Alterando Moradia...";
      this.carregando = false;

      if (sessionStorage.getItem('moradiaID') && String(sessionStorage.getItem('moradiaID'))?.length > 0) {
        this.editaMoradia(formularioMoradia);
      } else {
        this.incluiMoradia(formularioMoradia);
      }
      console.log(this.formularioMoradia)
    }
  }

  editaMoradia(formularioMoradia: Moradia): void {
    this.moradiaService.putMoradia(JSON.parse(JSON.stringify(formularioMoradia)), String(sessionStorage.getItem('moradiaID'))).pipe(
      finalize(() => this.carregando = true)
    ).subscribe(
      res => this.poNotificationService.success("Moradia Editada com Sucesso"),
      error => this.poNotificationService.error("Erro ao Editar a Moradia"),
    )
  }

  incluiMoradia(formularioMoradia: Moradia): void {
    this.moradiaService.postMoradia(JSON.parse(JSON.stringify(formularioMoradia))).pipe(
      finalize(() => this.carregando = true)
    ).subscribe(
      res => {
        this.poNotificationService.success("Moradia Incluída com Sucesso"), sessionStorage.setItem('moradiaID', res.id)
      },
      error => this.poNotificationService.error("Erro ao Editar a Moradia"),
    )
  }

  protected buildResourceForm(): void { }

  protected creationPageTitle(): string {
    return 'Novo Assentamento';
  }

  protected editionPageTitle(): string {
    const informacoesAssentamento =
      `${this.route.snapshot.paramMap.get('id')}` || '';
    return 'Editando Assentamento'
  }
}

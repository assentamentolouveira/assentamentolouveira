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
import { FormGroup } from '@angular/forms';
import { take, finalize, retry } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-assentamento-form',
  templateUrl: './assentamento-form.component.html',
  styleUrls: ['./assentamento-form.component.css'],
})
export class AssentamentoFormComponent extends BaseResourceFormComponent<Assentamento> {
  public readonly actions: Array<PoPageAction> = [
    { label: 'Salvar', action: () => alert('Salvar'), icon: 'po-icon-ok' }
  ];

  public isTitular = true;
  public isDependente = false;
  public isMoradia = false;
  public carregando = true;
  public mensagemLoading = ''
  public habilitaRenda = false;
  public titularValido = false;
  public edicao = false;
  public atualizaDepentente = false;


  private titular: Titular;
  private dependentes: Dependente[];

  public comboRenda: PoComboOption[] = [];

  botoes: Array<PoButtonGroupItem> = [
    {
      label: 'Titular',
      action: () => this.action(true, false, false, 1),
      selected: true,
      icon: 'po-icon-user'
    },
    {
      label: 'Dependente',
      action: () => this.action(false, true, false, 2),
      selected: false,
      icon: 'po-icon-users'
    },
    {
      label: 'Moradia',
      action: () => this.action(false, false, true, 3),
      selected: false,
      icon: 'po-icon-warehouse'
    },
  ];

  constructor(
    protected assentamentoService: AssentamentoService,
    protected injector: Injector,
    private poNotificationService: PoNotificationService,
    private loginService: LoginService,
    private titularService: TitularesService,
    private depentendesService: DependentesService,
    private moradiaService: MoradiaService
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
    this.poNotificationService.setDefaultDuration(3000);
  }

  action(
    isTitular: boolean,
    isDependente: boolean,
    isMoradia: boolean,
    opcaoSelecionada: number
  ) {
    this.isTitular = isTitular;
    this.isDependente = isDependente;
    this.isMoradia = isMoradia;
    this.botoes.map((botao, indice) => {
      indice + 1 === opcaoSelecionada
        ? (this.botoes[indice].selected = true)
        : (this.botoes[indice].selected = false);
    });
  }

  dependenteValido(): boolean {
    if (!this.titularValido) {
      this.poNotificationService.error("Informe os campos obrigatórios do Titular")
    }
    return this.titularValido
  }

  formularioTitularValido(formularioValido: FormGroup): boolean {
    this.titular = JSON.parse(this.titularService.getTitularInfo());
    if (formularioValido.valid) {
      this.carregando = false;
      this.edicao ? this.editaTitular(formularioValido.value) : this.incluiTitular(formularioValido.value)
    }
    this.titular = formularioValido.value;
    return formularioValido.valid
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

      this.incluiMoradia(res);

      const dadosTitular = JSON.parse(this.titularService.getTitularInfo());
      const listaDeDepententes = dadosTitular.dependentes.split(',');

      if (listaDeDepententes.length > 0) {
        this.incluiDependentes(listaDeDepententes, res);
      } else {
        this.carregando = true;
        this.titularValido = true
      }
    }
      , error => {
        this.carregando = true;
        this.titularValido = true;
        this.poNotificationService.error(error.message)
        console.error(error)
      })

  }

  recebeDependentes(dependentes: any): void {
    this.dependentes = dependentes;
    this.montaComboRenda();
  }

  incluiMoradia(res: Titular): void {
    this.moradiaService.postMoradia(res).subscribe();
  }

  incluiDependentes(listaDeDepententes: string[], titular: Titular): void {
    let observablesDependentes = {};

    this.mensagemLoading = "Incluindo Dependentes...";
    this.titularValido = false;
    listaDeDepententes.forEach((dependente) => {
      Object.assign(observablesDependentes, { [dependente]: this.depentendesService.incluiDependente(titular.id, dependente).pipe(retry(3)) })
    })

    forkJoin(observablesDependentes).pipe(
      finalize(() => this.carregando = true)
    ).subscribe(
      res => {
        this.titularValido = true;
      }
      , erro => console.error(`erro ao cadastrar dependente ${erro}`)
    )
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
    if (formularioMoradia.valid) {
      console.log(formularioMoradia)
    }
  }

  protected buildResourceForm(): void { }

  protected creationPageTitle(): string {
    return 'Novo Assentamento';
  }

  protected editionPageTitle(): string {
    const informacoesAssentamento =
      `${this.route.snapshot.paramMap.get('id')}` || '';
    return 'Editando Usuário: ' + informacoesAssentamento;
  }
}

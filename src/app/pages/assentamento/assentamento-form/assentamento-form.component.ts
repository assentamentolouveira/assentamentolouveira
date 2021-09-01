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
import { take, finalize } from 'rxjs/operators';

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
  public carregando = false;

  private titularValido = false;
  private edicao = false;
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
    private titularService: TitularesService
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
      this.poNotificationService.error("Informe os campos obrigatórios")
    }
    return this.titularValido
  }

  formularioTitularValido(formularioValido: FormGroup): boolean {
    if (formularioValido.valid) {
      this.titular = JSON.parse(this.titularService.getTitularInfo());
      this.montaComboRenda();
      this.carregando = false;
      if (this.edicao) {
        this.titularService.alterarTitular(formularioValido.value).pipe(
          take(1),
          finalize(() => this.carregando = true)
        ).subscribe(res => console.log(res), error => console.error(error))
      } else {
        this.titularService.criarTitular(formularioValido.value).pipe(
          take(1),
          finalize(() => this.carregando = true)
        ).subscribe(res => console.log(res), error => console.error(error))
      }
    }

    this.titularValido = formularioValido.valid;
    this.titular = formularioValido.value;
    return formularioValido.valid
  }

  recebeDependentes(dependentes: any): void {
    this.dependentes = dependentes;
  }

  montaComboRenda(): void {
    this.comboRenda.push({ value: this.titular.id, label: this.titular.nomeResponsavel })
    this.dependentes?.map(dependente => this.comboRenda.push({ value: dependente.id, label: dependente.nome }));

    console.log("combo Renda", this.comboRenda)
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

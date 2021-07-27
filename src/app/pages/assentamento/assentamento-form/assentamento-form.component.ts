import { PoButtonGroupItem, PoPageAction } from '@po-ui/ng-components';
import { LoginService } from './../../../core/login/shared/login.service';
import { Router } from '@angular/router';
import { AssentamentoService } from './../shared/assentamento.service';
import { Assentamento } from './../shared/assentamento.model';
import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-assentamento-form',
  templateUrl: './assentamento-form.component.html',
  styleUrls: ['./assentamento-form.component.css'],
})
export class AssentamentoFormComponent extends BaseResourceFormComponent<Assentamento> {
  public readonly actions: Array<PoPageAction> = [
    { label: 'Salvar', action: () => alert('Salvar'), icon: 'po-icon-ok' },
  ];

  public isTitular = true;
  public isDependente = false;
  public isMoradia = false;

  buttons: Array<PoButtonGroupItem> = [
    {
      label: 'Titular',
      action: () => this.action(true, false, false, 1),
      selected: true
    },
    {
      label: 'Dependente',
      action: () => this.action(false, true, false, 2),
      selected: false
    },
    {
      label: 'Moradia',
      action: () => this.action(false, false, true, 3),
      selected: false
    },
  ];

  constructor(
    protected assentamentoService: AssentamentoService,
    protected injector: Injector,
    private loginService: LoginService
  ) {
    super(injector, new Assentamento(), assentamentoService);
    if (this.loginService.isInternet) {
      this.actions.push({
        label: 'Sair',
        action: () => this.router.navigate(['/internet/login']),
        icon: 'po-icon-exit',
      });
    }
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
    this.buttons.map((botao, indice) => {
      indice + 1 === opcaoSelecionada
        ? (this.buttons[indice].selected = true)
        : (this.buttons[indice].selected = false);
    });
  }
  protected buildResourceForm(): void {}

  protected creationPageTitle(): string {
    return 'Novo Assentamento';
  }

  protected editionPageTitle(): string {
    const informacoesAssentamento =
      `${this.route.snapshot.paramMap.get('id')}` || '';
    return 'Editando Assentamento: ' + informacoesAssentamento;
  }
}

import { DependentesService } from './../shared/dependentes.service';
import { PoTableAction, PoTableColumn, PoNotificationService } from '@po-ui/ng-components';
import { Component, OnInit } from '@angular/core';
import { Dependentes } from '../shared/dependentes.model';

@Component({
  selector: 'app-dependentes-form',
  templateUrl: './dependentes-form.component.html',
  styles: [
  ]
})
export class DependentesFormComponent implements OnInit {
  public colunas: PoTableColumn[];
  public listaDependentes: Array<any> = []
  public acoes: Array<PoTableAction> = [
    {
      icon: 'po-icon-edit',
      label: 'Editar Dependente',
      action: this.editarDependente.bind(this)
    },
    {
      icon: 'po-icon-user-delete',
      label: 'Remover Dependente',
      type:'danger',

    }

  ];
  public dependenteSelecionado:number = 0;

  constructor(private dependentesService: DependentesService, private poNotificationService:PoNotificationService) { }

  ngOnInit(): void {
    this.colunas = this.dependentesService.getColumns();
    this.carregaDados();
  }

  carregaDados(): void {
    this.dependentesService.getAll().subscribe(resposta => {
      this.listaDependentes = this.listaDependentes.concat(resposta)}
      );
  }

  carregarMais(): void {
    this.carregaDados();
  }

  editarDependente(dependenteSelecionado: any): void{
    this.dependenteSelecionado = dependenteSelecionado.id;
  }

  salvarEdicao(): void {
    this.poNotificationService.success('Registro Alterado com Sucesso')
  }
}

import { DependentesService } from './../shared/dependentes.service';
import { PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dependentes-form',
  templateUrl: './dependentes-form.component.html',
  styles: [
  ]
})
export class DependentesFormComponent implements OnInit {
  public colunas: PoTableColumn[];
  public listaDependentes: Array<any>
  public acoes: Array<PoTableAction> = [
    {
      icon: 'po-icon-edit',
      label: 'Editar Dependente'
    },
    {
      icon: 'po-icon-user-delete',
      label: 'Remover Dependente',
      type:'danger',

    }

  ];

  constructor(private dependentesService: DependentesService) { }

  ngOnInit(): void {
    this.colunas = this.dependentesService.getColumns();
    this.dependentesService.getAll().subscribe(resposta => this.listaDependentes = resposta);
  }

}

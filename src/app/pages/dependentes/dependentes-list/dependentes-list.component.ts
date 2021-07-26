import { Component } from '@angular/core';

import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { DependentesService } from './../shared/dependentes.service';
import { Titulares } from '../../titulares/shared/titulares.model';

@Component({
  selector: 'app-dependentes-list',
  templateUrl: './dependentes-list.component.html',
  styles: [],
})
export class DependentesListComponent extends BaseResourceListComponent<Titulares> {
  constructor(protected dependentesService: DependentesService) {
    super('Cadastro de Dependentes', 'dependentes/novo', dependentesService);
  }
}

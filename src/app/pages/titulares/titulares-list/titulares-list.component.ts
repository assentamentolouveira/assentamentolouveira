import { TitularesService } from './../shared/titulares.service';
import { Component } from '@angular/core';

import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Titulares } from '../shared/titulares.model';

@Component({
  selector: 'app-titulares-list',
  templateUrl: './titulares-list.component.html',
  styles: [],
})
export class TitularesListComponent extends BaseResourceListComponent<Titulares> {
  constructor(protected titularesService: TitularesService) {
    super('Cadastro de Títular', 'titulares/novo', titularesService);
  }
}

import { Assentamento } from './../shared/assentamento.model';
import { AssentamentoService } from './../shared/assentamento.service';
import { Component } from '@angular/core';

import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Titulares } from '../../titulares/shared/titulares.model';

@Component({
  selector: 'app-assentamento-list',
  templateUrl: './assentamento-list.component.html',
  styleUrls: ['./assentamento-list.component.css']
})
export class AssentamentoListComponent extends BaseResourceListComponent {
  constructor(protected assentamentoService:AssentamentoService) {
    super('Cadastro de Assentamento', 'assentamento/novo', assentamentoService);
  }
}

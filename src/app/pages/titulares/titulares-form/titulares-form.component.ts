import { Component, Injector } from '@angular/core';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Titulares } from '../shared/titulares.model';
import { TitularesService } from './../shared/titulares.service';

@Component({
  selector: 'app-titulares-form',
  templateUrl: './titulares-form.component.html',
  styles: [],
})
export class TitularesFormComponent extends BaseResourceFormComponent<Titulares> {
  constructor(
    protected titularesService: TitularesService,
    protected injector: Injector
  ) {
    super(injector, new Titulares(), titularesService);
  }

  protected buildResourceForm(): void {}

  protected creationPageTitle(): string {
    return 'Novo Títular';
  }

  protected editionPageTitle(): string {
    const titularesNome = this.resource.nome || '';
    return 'Editando Titular:' + titularesNome;
  }
}

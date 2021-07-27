import { Component, Injector, Input } from '@angular/core';
import { PoRadioGroupOption, PoSelectOption } from '@po-ui/ng-components';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Titulares } from '../shared/titulares.model';
import { TitularesService } from './../shared/titulares.service';

@Component({
  selector: 'app-titulares-form',
  templateUrl: './titulares-form.component.html',
  styles: [],
})
export class TitularesFormComponent extends BaseResourceFormComponent<Titulares> {
  estadoCivilOpcoes: Array<PoSelectOption>;
  parentescoOpcoes: Array<PoSelectOption>;
  generoOpcoes: Array<PoSelectOption>;
  naturalidadeOpcoes: Array<PoSelectOption>;

  @Input() isDependente = false;

  readonly especialOpcoes: Array<PoRadioGroupOption> = [
    { label: 'Sim', value: 'S' },
    { label: 'Não', value: 'N' },
  ];

  constructor(
    protected titularesService: TitularesService,
    protected injector: Injector
  ) {
    super(injector, new Titulares(), titularesService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initialize();
  }

  protected buildResourceForm(): void {}

  protected creationPageTitle(): string {
    return 'Novo Títular';
  }

  protected editionPageTitle(): string {
    const titularesNome = this.resource.nome || '';
    return 'Editando Titular:' + titularesNome;
  }

  initialize(): void {
    this.estadoCivilOpcoes = [
      {
        value: 'C',
        label: 'Casado(a)',
      },
      {
        value: 'D',
        label: 'Divorciado(a)',
      },
      {
        value: 'S',
        label: 'Solteiro(a)',
      },
      {
        value: 'V',
        label: 'Viúvo(a)',
      },
    ];
    this.generoOpcoes = [
      {
        value: 'F',
        label: 'Feminino',
      },
      {
        value: 'M',
        label: 'Masculino',
      },
    ];

    this.parentescoOpcoes =[
      {
        value: 'filho',
        label: 'Filho',
      },
      {
        value: 'pai',
        label: 'Pai',
      },
      {
        value: 'mae',
        label: 'Mãe',
      },
    ]
  }
}

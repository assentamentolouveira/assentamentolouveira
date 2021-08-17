import { Component, Injector, Input } from '@angular/core';
import { PoRadioGroupOption, PoSelectOption, PoTableAction, PoTableColumn } from '@po-ui/ng-components';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Titulares } from '../shared/titulares.model';
import { TitularesService } from './../shared/titulares.service';

@Component({
  selector: 'app-titulares-form',
  templateUrl: './titulares-form.component.html',
  styles: [],
})
export class TitularesFormComponent extends BaseResourceFormComponent<Titulares> {
  public estadoCivilOpcoes: Array<PoSelectOption>;
  public parentescoOpcoes: Array<PoSelectOption>;
  public etniaOpcoes: Array<PoSelectOption>;
  public generoOpcoes: Array<PoSelectOption>;
  public escolaridadeOpcoes: Array<PoSelectOption>;
  public naturalidadeOpcoes: Array<PoSelectOption>;
  public deficienciaOpcoes: Array<PoSelectOption>;
  public boleanoOpcoes: Array<PoSelectOption>;
  public familiaDomicilioOpcoes: Array<PoSelectOption>;
  public tempoDeMoradiaOpcoes: Array<PoSelectOption>;
  public colunasRenda: PoTableColumn[];
  public listaRendas: Array<any> = []
  public acoes: Array<PoTableAction> = [
    {
      icon: 'po-icon-edit',
      label: 'Editar Dependente',
      action: this.editarRenda.bind(this)
    },
    {
      icon: 'po-icon-user-delete',
      label: 'Remover Dependente',
      type: 'danger',

    }

  ];
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

  protected buildResourceForm(): void { }

  protected creationPageTitle(): string {
    return 'Novo Títular';
  }

  protected editionPageTitle(): string {
    const titularesNome = this.resource.nome || '';
    return 'Editando Titular:' + titularesNome;
  }

  editarRenda(): void {

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
        value: '1',
        label: 'Masculino',
      },
      {
        value: '2',
        label: 'Feminino',
      },
      {
        value: '3',
        label: 'Não Binário',
      },
      {
        value: '4',
        label: 'Prefiro não informar',
      },
    ];

    this.parentescoOpcoes = [
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
    ];

    this.etniaOpcoes = [
      {
        value: '1',
        label: 'Branca',
      },
      {
        value: '2',
        label: 'Parda',
      },
      {
        value: '3',
        label: 'Preta',
      },
      {
        value: '4',
        label: 'Amarela',
      },
      {
        value: '5',
        label: 'Indígena',
      },
    ];

    this.escolaridadeOpcoes = [
      {
        value: '0',
        label: 'Não Informado',
      },
      {
        value: '1',
        label: 'Fundamental Completo',
      },
      {
        value: '2',
        label: 'Fundamental Incompleto',
      },
      {
        value: '3',
        label: 'Ensino Médio Completo',
      },
      {
        value: '4',
        label: 'Ensino Médio Incompleto',
      },
      {
        value: '5',
        label: 'Superior Completo',
      },
      {
        value: '6',
        label: 'Superior Incompleto',
      },
      {
        value: '7',
        label: 'Ensino Técnico Completo',
      },
      {
        value: '8',
        label: 'Ensino Técnico Incompleto',
      },
      {
        value: '9',
        label: 'Não Alfabetizado',
      }
    ];

    this.deficienciaOpcoes = [
      {
        value: '1',
        label: 'Cegueira',
      },
      {
        value: '2',
        label: 'Baixa Visão',
      },
      {
        value: '3',
        label: 'Surdez severa/profunda',
      },
      {
        value: '4',
        label: 'Surdez leve/moderada',
      },
      {
        value: '5',
        label: 'Deficiência Física',
      },
      {
        value: '6',
        label: 'Deficiência Mental',
      },
      {
        value: '7',
        label: 'Deficiência Intelectual',
      },
      {
        value: '8',
        label: 'Síndrome de Down',
      },
      {
        value: '9',
        label: 'Transtorno/Doença Mental',
      }
    ];

    this.boleanoOpcoes = [
      {
        value: '1',
        label: 'Sim'
      },
      {
        value: '2',
        label: 'Não'
      }
    ];

    this.familiaDomicilioOpcoes = [
      {
        value: '1',
        label: 'Uma Família'
      },
      {
        value: '2',
        label: 'Duas Famílias'
      },
      {
        value: '3',
        label: 'Três Famílias'
      },
      {
        value: '4',
        label: 'Mais de Três Familias'
      }
    ];

    this.tempoDeMoradiaOpcoes = [
      {
        value: '1',
        label: 'Até 1 ano'
      },
      {
        value: '2',
        label: 'De 1 à 5 anos'
      },
      {
        value: '3',
        label: 'De 5 à 10 anos'
      },
      {
        value: '4',
        label: 'De 10 à 20 anos'
      }, {
        value: '5',
        label: 'De 20 à 30 anos'
      },
      {
        value: '6',
        label: 'Acima de 30 anos'
      }
    ];

    this.colunasRenda = this.titularesService.getRendasColumns();
    this.listaRendas = this.titularesService.retornaRendas();
  }
}

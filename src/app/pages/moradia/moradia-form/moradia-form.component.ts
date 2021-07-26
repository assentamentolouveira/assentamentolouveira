import { Component, OnInit } from '@angular/core';
import { PoSelectOption } from '@po-ui/ng-components';

@Component({
  selector: 'app-moradia-form',
  templateUrl: './moradia-form.component.html',
  styleUrls: ['./moradia-form.component.css'],
})
export class MoradiaFormComponent implements OnInit {
  tempoResidenciaOpcoes: Array<PoSelectOption>;
  familiasOpcoes: Array<PoSelectOption>;

  constructor() {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.tempoResidenciaOpcoes = [
      {
        value: '1',
        label: 'Menos de 1 ano',
      },
      {
        value: '2',
        label: 'Entre 1 e 2 anos',
      },
      {
        value: '3',
        label: 'Entre 3 e 4 anos',
      },
      {
        value: '4',
        label: 'Entre 5 e 8 anos',
      },
      {
        value: '5',
        label: 'Entre 9 e 10 anos',
      },
      {
        value: '6',
        label: 'Acima de 10 anos',
      },
    ];
    this.familiasOpcoes = [
      {
        value: '1',
        label: '1 Família',
      },
      {
        value: '2',
        label: '2 Famílias',
      },
      {
        value: '3',
        label: '3 Famílias',
      },
    ];
  }
}

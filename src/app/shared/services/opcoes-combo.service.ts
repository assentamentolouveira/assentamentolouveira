import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpcoesComboService {

  estadoCivilOpcoes = [
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

  generoOpcoes = [
    {
      value: 1,
      label: 'Masculino',
    },
    {
      value: 2,
      label: 'Feminino',
    },
    {
      value: 3,
      label: 'Não Binário',
    },
    {
      value: 4,
      label: 'Prefiro não informar',
    },
  ];

  parentescoOpcoes = [
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

  etniaOpcoes = [
    {
      value: 1,
      label: 'Branca',
    },
    {
      value: 2,
      label: 'Parda',
    },
    {
      value: 3,
      label: 'Preta',
    },
    {
      value: 4,
      label: 'Amarela',
    },
    {
      value: 5,
      label: 'Indígena',
    },
  ];

  escolaridadeOpcoes = [
    {
      value: 10,
      label: 'Não Alfabetizado',
    },
    {
      value: 1,
      label: 'Fundamental Completo',
    },
    {
      value: 2,
      label: 'Fundamental Incompleto',
    },
    {
      value: 3,
      label: 'Ensino Médio Completo',
    },
    {
      value: 4,
      label: 'Ensino Médio Incompleto',
    },
    {
      value: 5,
      label: 'Superior Completo',
    },
    {
      value: 6,
      label: 'Superior Incompleto',
    },
    {
      value: 7,
      label: 'Ensino Técnico Completo',
    },
    {
      value: 8,
      label: 'Ensino Técnico Incompleto',
    },
    {
      value: 9,
      label: 'Não Informado',
    }
  ];

  deficienciaOpcoes = [
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

  boleanoOpcoes = [
    {
      value: 1,
      label: 'Sim'
    },
    {
      value: 2,
      label: 'Não'
    }
  ];

  familiaDomicilioOpcoes = [
    {
      value: 1,
      label: 'Uma Família'
    },
    {
      value: 2,
      label: 'Duas Famílias'
    },
    {
      value: 3,
      label: 'Três Famílias'
    },
    {
      value: 4,
      label: 'Mais de Três Familias'
    }
  ];

  tempoDeMoradiaOpcoes = [
    {
      value: 1,
      label: 'Até 1 ano'
    },
    {
      value: 2,
      label: 'De 1 à 5 anos'
    },
    {
      value: 3,
      label: 'De 5 à 10 anos'
    },
    {
      value: 4,
      label: 'De 10 à 20 anos'
    }, {
      value: 5,
      label: 'De 20 à 30 anos'
    },
    {
      value: 6,
      label: 'Acima de 30 anos'
    }
  ];

  parentescoResponsavelOpcoes = [
    {
      value: 1,
      label: 'Pessoa de Referência'
    },
    {
      value: 2,
      label: 'Cônjuge/Companheiro(a)'
    },
    {
      value: 3,
      label: 'Filho(a)'
    },
    {
      value: 4,
      label: 'Enteado(a)'
    },
    {
      value: 5,
      label: 'Neto(a)'
    },
    {
      value: 6,
      label: 'Pai'
    },
    {
      value: 7,
      label: 'Mãe'
    },
    {
      value: 8,
      label: 'Sogro(a)'
    },
    {
      value: 9,
      label: 'Irmão/Irmã'
    },
    {
      value: 10,
      label: 'Genro'
    },
    {
      value: 11,
      label: 'Nora'
    },
    {
      value: 12,
      label: 'Bisneto(a)'
    },
    {
      value: 13,
      label: 'Outro Parente'
    },
    {
      value: 14,
      label: 'Não Parente'
    }
  ]

  constructor() { }
}

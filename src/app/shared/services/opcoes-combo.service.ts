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
      value: 'Masculino',
      label: 'Masculino',
    },
    {
      value: 'Feminino',
      label: 'Feminino',
    },
    {
      value: 'NaoBinario',
      label: 'Não Binário',
    },
    {
      value: 'PrefiroNaoInformar ',
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
      value: 'Branca',
      label: 'Branca',
    },
    {
      value: 'Parda',
      label: 'Parda',
    },
    {
      value: 'Preta',
      label: 'Preta',
    },
    {
      value: 'Amarela',
      label: 'Amarela',
    },
    {
      value: 'Indigena',
      label: 'Indígena',
    },
  ];

  escolaridadeOpcoes = [
    {
      value: 'NaoAlfabetizado',
      label: 'Não Alfabetizado',
    },
    {
      value: 'FundamentalCompleto',
      label: 'Fundamental Completo',
    },
    {
      value: 'FundamentalIncompleto',
      label: 'Fundamental Incompleto',
    },
    {
      value: 'EnsinoMedioCompleto',
      label: 'Ensino Médio Completo',
    },
    {
      value: 'EnsinoMedioIncompleto',
      label: 'Ensino Médio Incompleto',
    },
    {
      value: 'SuperiorCompleto',
      label: 'Superior Completo',
    },
    {
      value: 'SuperiorIncompleto',
      label: 'Superior Incompleto',
    },
    {
      value: 'TecnicoCompleto',
      label: 'Ensino Técnico Completo',
    },
    {
      value: 'TecnicoIncompleto',
      label: 'Ensino Técnico Incompleto',
    },
    {
      value: 'NaoInformado ',
      label: 'Não Informado',
    }
  ];


  rendaOpcoes =[
    {
      value: 'Formal',
      label: 'Formal',
    },
    {
      value: 'InformalFormal',
      label: 'Informal',
    },
    {
      value: 'Aposentadoria',
      label: 'Aposentadoria',
    },
    {
      value: 'PensaoMorte',
      label: 'Pensão Morte',
    },
    {
      value: 'PensaoAlimenticia',
      label: 'Pensão Alimentícia',
    },
    {
      value: 'Bpc',
      label: 'BPC',
    }
  ]

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
      value: 'Um',
      label: 'Uma Família'
    },
    {
      value: 'Dois',
      label: 'Duas Famílias'
    },
    {
      value: 'Tres',
      label: 'Três Famílias'
    },
    {
      value: 'AcimaDeTres',
      label: 'Mais de Três Familias'
    }
  ];

  tempoDeMoradiaOpcoes = [
    {
      value: 'AteUmAno',
      label: 'Até 1 ano'
    },
    {
      value: 'UmACincoAnos',
      label: 'De 1 à 5 anos'
    },
    {
      value: 'DeCincoADezAnos',
      label: 'De 5 à 10 anos'
    },
    {
      value: 'DeDezAVinteAnos',
      label: 'De 10 à 20 anos'
    }, {
      value: 'DeVinteATrintaAnos',
      label: 'De 20 à 30 anos'
    },
    {
      value: 'AcimaDeTrintaAnos ',
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

  retornaLabelOpcoes(valor: number | string, combo: any[]): string {
    let comboFilter = combo.filter(opc => opc.value === valor)
    return comboFilter[0]?.label ? comboFilter[0].label : '';
  }

  constructor() {
   }
}

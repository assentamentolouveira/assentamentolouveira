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


  rendaOpcoes = [
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

  familiaTemCadastroUnicoOpcoes = [
    {
      value: 1,
      label: 'Sim, no Município'
    },
    {
      value: 2,
      label: 'Sim, em outro Município'
    },
    {
      value: 3,
      label: 'Não possuo'
    }
  ]

  moradiaOpcoes = [
    {
      value: 1,
      label: 'Própria'
    },
    {
      value: 2,
      label: 'Cedida'
    },
    {
      value: 3,
      label: 'Alugada'
    },
    {
      value: 4,
      label: 'Ocupação de áreas públicas ou particulares'
    }
  ]

  quantidadeBanheirosOpcoes = [
    {
      value: 'Um',
      label: 'Um'
    },
    {
      value: 'Dois',
      label: 'Dois'
    },
    {
      value: 'Tres',
      label: 'TrÊs'
    },
    {
      value: 'AcimaDeTres',
      label: 'Acima de Três'
    }
  ];


  quantidadeComodosOpcoes = [
    {
      value: 'Um',
      label: 'Um'
    },
    {
      value: 'Dois',
      label: 'Dois'
    },
    {
      value: 'Tres',
      label: 'Três'
    },
    {
      value: 'Quatro',
      label: 'Quatro'
    },
    {
      value: 'AcimaDeQuatro',
      label: 'Acima de Quatro'
    }
  ];

  tipoMoradiaOpcoes = [
    {
      value: 1,
      label: 'Casa'
    },
    {
      value: 2,
      label: 'Casa de vila ou condomínio'
    },
    {
      value: 3,
      label: 'Apartamento'
    },
    {
      value: 4,
      label: 'Cômodos compartilhados'
    },
    {
      value: 5,
      label: 'Cortiço'
    },
    {
      value: 6,
      label: 'Outro'
    }
  ]

  caracteristicasCasaOpcoes = [
    {
      value: 1,
      label: 'Alvenaria/tijolo com revestimento'
    },
    {
      value: 2,
      label: 'Alvenaria/tijolo sem revestimento '
    },
    {
      value: 3,
      label: 'Madeira'
    },
    {
      value: 4,
      label: 'Taipa revestida'
    },
    {
      value: 5,
      label: 'Taipa não revestida'
    },
    {
      value: 6,
      label: 'Cobertura com Laje'
    },
    {
      value: 7,
      label: 'Cobertura sem Laje'
    },
    {
      value: 8,
      label: 'Misto madeira e alvenaria'
    }
  ]

  acessoEnergiaOpcoes = [
    {
      value: 1,
      label: 'Sim, com medidor próprio'
    },
    {
      value: 2,
      label: 'Sim, com medidor compartilhado'
    },
    {
      value: 3,
      label: 'Sim, sem medidor'
    },
    {
      value: 4,
      label: 'Não possui energia elétrica no domicílio'
    }
  ]

  acessoAguaOpcoes = [
    {
      value: 1,
      label: 'Rede geral de distribuição'
    },
    {
      value: 2,
      label: 'Poço ou nascente'
    },
    {
      value: 3,
      label: 'Cisterna de captação de águas de chuva '
    },
    {
      value: 4,
      label: 'Carro pipa'
    },
    {
      value: 5,
      label: 'Não possui acesso a água'
    }
  ]

  acessoSaneamentoOpcoes = [
    {
      value: 1,
      label: 'Rede esgoto'
    },
    {
      value: 2,
      label: 'Fossa séptica'
    },
    {
      value: 3,
      label: 'Fossa Rudimentar'
    },
    {
      value: 4,
      label: 'Céu Aberto'
    },
    {
      value: 5,
      label: 'Domicílio sem banheiro'
    }
  ]

  acessoColetaOpcoes = [
    {
      value: 1,
      label: 'Sim, coleta direta (na porta de casa)'
    },
    {
      value: 2,
      label: 'Sim, coleta indireta'
    },
    {
      value: 3,
      label: 'Não possui coleta'
    }
  ]

  numeroAutomoveiOpcoes = [
    {
      value: 1,
      label: 'Um'
    },
    {
      value: 2,
      label: 'Dois'
    },
    {
      value: 3,
      label: 'Acima de Dois'
    },
    {
      value: 4,
      label: 'Não possui'
    }
  ]

  desastresOpcoes = [
    {
      value: 1,
      label: 'Alagamento'
    },
    {
      value: 2,
      label: 'Deslizamento de Terra'
    },
    {
      value: 3,
      label: 'Desabamento de Estrutura'
    },
    {
      value: 4,
      label: 'Incêndio'
    },
    {
      value: 5,
      label: 'Não Sofreu'
    }
  ]

  usoMoradiaOpcoes = [
    {
      value: 1,
      label: 'Habitacional'
    },
    {
      value: 2,
      label: 'Comercial'
    },
    {
      value: 3,
      label: 'Misto Habitacional e Comercial'
    },
    {
      value: 4,
      label: 'Igreja'
    },
    {
      value: 5,
      label: 'Misto Residencial e Igreja'
    },
    {
      value: 6,
      label: 'Outro'
    }
  ]

  retornaLabelOpcoes(valor: number | string, combo: any[]): string {
    let comboFilter = combo.filter(opc => opc.value === valor)
    return comboFilter[0]?.label ? comboFilter[0].label : '';
  }

  constructor() {
  }
}

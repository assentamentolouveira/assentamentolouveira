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
      value: 'DoMunicipio',
      label: 'Sim, no Município'
    },
    {
      value: 'OutroMunicipio',
      label: 'Sim, em outro Município'
    },
    {
      value: 'Nao',
      label: 'Não possuo'
    }
  ]

  moradiaOpcoes = [
    {
      value: 'Propria',
      label: 'Própria'
    },
    {
      value: 'Cedida',
      label: 'Cedida'
    },
    {
      value: 'Alugada',
      label: 'Alugada'
    },
    {
      value: 'Ocupacao',
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
      label: 'Três'
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
      value: 'Casa',
      label: 'Casa'
    },
    {
      value: 'CasaDeVila',
      label: 'Casa de vila ou condomínio'
    },
    {
      value: 'Condominio',
      label: 'Condominio'
    },
    {
      value: 'Apartamento',
      label: 'Apartamento'
    },
    {
      value: 'ComodoCompartilhado',
      label: 'Cômodos compartilhados'
    },
    {
      value: 'Cortico',
      label: 'Cortiço'
    },
    {
      value: 'Outro',
      label: 'Outro'
    }
  ]

  caracteristicasCasaOpcoes = [
    {
      value: 'AlvenariaRevestimento',
      label: 'Alvenaria/tijolo com revestimento'
    },
    {
      value: 'AlvenariaSemRevestimento',
      label: 'Alvenaria/tijolo sem revestimento '
    },
    {
      value: 'Madeira',
      label: 'Madeira'
    },
    {
      value: 'TaipaRevestida',
      label: 'Taipa revestida'
    },
    {
      value: 'TaipaNaoRevestida',
      label: 'Taipa não revestida'
    },
    {
      value: 'CoberturaComLaje',
      label: 'Cobertura com Laje'
    },
    {
      value: 'CoberturaSemLaje',
      label: 'Cobertura sem Laje'
    },
    {
      value: 'MistoMadeiraAlvenaria',
      label: 'Misto madeira e alvenaria'
    }
  ]

  acessoEnergiaOpcoes = [
    {
      value: 'SimComMedidorProprio',
      label: 'Sim, com medidor próprio'
    },
    {
      value: 'SimComMedidorCompartilhado',
      label: 'Sim, com medidor compartilhado'
    },
    {
      value: 'SimSemMedidor',
      label: 'Sim, sem medidor'
    },
    {
      value: 'NaoPossuiEnergiaEletricaNoDomicilio',
      label: 'Não possui energia elétrica no domicílio'
    }
  ]

  acessoAguaOpcoes = [
    {
      value: 'RedeGeralDeDistribuicao',
      label: 'Rede geral de distribuição'
    },
    {
      value: 'PocoOuNascente',
      label: 'Poço ou nascente'
    },
    {
      value: 'Cisterna',
      label: 'Cisterna de captação de águas de chuva '
    },
    {
      value: 'CarroPipa',
      label: 'Carro pipa'
    },
    {
      value: 'NaoPossuiAcessoAgua',
      label: 'Não possui acesso a água'
    }
  ]

  acessoSaneamentoOpcoes = [
    {
      value: 'RedeDeEsgoto',
      label: 'Rede esgoto'
    },
    {
      value: 'FossaSeptica',
      label: 'Fossa séptica'
    },
    {
      value: 'FossaRudimentar',
      label: 'Fossa Rudimentar'
    },
    {
      value: 'CeuAberto',
      label: 'Céu Aberto'
    },
    {
      value: 'DomicilioSemBanheira',
      label: 'Domicílio sem banheiro'
    }
  ]

  acessoColetaOpcoes = [
    {
      value: 'DomicilioSemBanheira',
      label: 'Sim, coleta direta (na porta de casa)'
    },
    {
      value: 'SimColetaIndireta',
      label: 'Sim, coleta indireta'
    },
    {
      value: 'NaoPossuiColeta',
      label: 'Não possui coleta'
    }
  ]

  numeroAutomoveiOpcoes = [
    {
      value: 'Um',
      label: 'Um'
    },
    {
      value: 'Dois',
      label: 'Dois'
    },
    {
      value: 'AcimaDeDois',
      label: 'Acima de Dois'
    },
    {
      value: 'NaoPossui',
      label: 'Não possui'
    }
  ]

  desastresOpcoes = [
    {
      value: 'Alagamento',
      label: 'Alagamento'
    },
    {
      value: 'DeslizamentoDeTerra',
      label: 'Deslizamento de Terra'
    },
    {
      value: 'DesabamentoDaEstrutura',
      label: 'Desabamento de Estrutura'
    },
    {
      value: 'Incendio',
      label: 'Incêndio'
    },
    {
      value: 'NaoSofreu',
      label: 'Não Sofreu'
    }
  ]

  usoMoradiaOpcoes = [
    {
      value: 'Habitacional',
      label: 'Habitacional'
    },
    {
      value: 'Comercial',
      label: 'Comercial'
    },
    {
      value: 'MistoResidenciaComercio',
      label: 'Misto Habitacional e Comercial'
    },
    {
      value: 'Igreja',
      label: 'Igreja'
    },
    {
      value: 'MistoResidenciaIgreja',
      label: 'Misto Residencial e Igreja'
    },
    {
      value: 'OutroUso',
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

export interface Titular {
  id: string,
  assentamento: string,
  numeroSelagemAtual: string,
  numeroSelagemAntiga: string,
  nomeResponsavel: string,
  numeroCartaoCidadao: string | number,
  numeroCpf: string,
  dataNascimento: string,
  genero: number,
  etnia: number,
  escolaridade: number,
  deficiencia: string,
  estadoCivil: number | string,
  rendaTotal: number,
  familiaIncProcHabit: number | boolean,
  quantidadeFamilia: number,
  tempoMoradiaBairro: number,
  tempoMoradiaLouveira: number,
  possuiImovel: number | boolean,
  qualLocalDoImovel: string,
  programaHabitacional: number | boolean,
  qualProgHabitacional: string,
  regFundOuUsocapiao: number | boolean,
  qualRegFundOuUsocapiao: string,
  aondeRegFundOuUsocapiao: string,
  dependentes?: string;
  telefoneTitular?: string;
  telefoneContato?: string;
  email?: string;
}

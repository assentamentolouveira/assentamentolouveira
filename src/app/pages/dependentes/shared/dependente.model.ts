export interface Dependente {
  id: string,
  cpfFormatado: string,
  nomeResponsavel: string,
  numeroCartaoCidadao: string,
  numeroCpf: string,
  dataNascimento: Date,
  parentesco: number | string,
  estadoCivil: number,
  escolaridade: number,
  deficiencia: number,
  nome: string,
}

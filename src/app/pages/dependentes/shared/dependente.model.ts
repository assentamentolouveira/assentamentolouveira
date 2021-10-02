export interface Dependente {
  id: string,
  cpfFormatado: string,
  nomeResponsavel: string,
  numeroCartaoCidadao: string | number,
  numeroCpf: string,
  dataNascimento: Date,
  grauParentesco: string,
  grauParentescoTratado: string,
  estadoCivil: number| string,
  escolaridade: number| string,
  deficiencia: number | string,
  nome: string,
  Nome?: string,
  cpfCartaoCidadao: string
}

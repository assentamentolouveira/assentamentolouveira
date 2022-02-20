import { Data } from "@angular/router";

export interface Dependente {
  id: string,
  cpfFormatado: string,
  nomeResponsavel: string,
  numeroCartaoCidadao: string | number,
  numeroCpf: string,
  dataNascimento: Date,
  nascimento?: Date,
  grauParentesco: string,
  grauParentescoTratado: string,
  estadoCivil: number| string,
  escolaridade: number| string,
  deficiencia: number | string,
  nome: string,
  Nome?: string,
  residente: number | boolean,
  cpfCartaoCidadao: string,
  status?: string,
  PCD?:string;
  pcd?:boolean
}

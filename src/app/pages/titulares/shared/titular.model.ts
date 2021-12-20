export interface Titular {
  id: string,
  assentamento: string,
  numeroSelagemAtual: string,
  numeroSelagemAntiga: string,
  nomeResponsavel: string,
  numeroCartaoCidadao: string | number,
  numeroCpf: string,
  dataNascimento: string,
  nascimento?: string,
  genero: number,
  etnia: number,
  escolaridade: number,
  deficiencia: string,
  estadoCivil: number | string,
  rendaTotal: number,
  dependentes?: string;
  telefoneTitular?: string;
  telefoneContato?: string;
  email?: string;
  pcd?: boolean;
  PCD?: string;
}

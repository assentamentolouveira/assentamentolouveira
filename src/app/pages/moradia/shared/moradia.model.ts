export interface Moradia {
  id: string,
  titularId: string,
  assentamento: string,
  numeroSelagemAtual: string | number,
  numeroSelagemAntiga: string | number,
  endereco: string,
  numero: string | number,
  complemento: string,
  bairro: string,
  cadastroUnicoFamilia: number | boolean,
  acessaUnidBasicaSaude: number | boolean,
  qualUnidBasicaSaude: string,
  temAcessoEscolaCreche: number | boolean,
  utilizaTransporteEscolar: number | boolean,
  acessaCras: number | boolean,
  acessaCreas: number | boolean,
  acessaServConvivenciaCriancaAdolescente: number | boolean,
  acessaServConvivenciaCriancaIdoso: number | boolean,
  tipoMoradia: number,
  quantidadeBanheiro: number,
  quantidadeComodo: number,
  tipoMoradiaOcupada: number,
  caracteristicaMoradia: object[],
  acessoEnergiaEletrica: number,
  acessoAbastecimentoAgua: number,
  acessoSaneamentoSanitario: number,
  possuiAutomovel: string,
  moradiaSofreuDesastre: number,
  usoMoradia: number,
  cachorro: number,
  gato: number,
  passaro: number,
  outroAnimais: number,
  gastoComAluguel: number,
  gastoComEnergiaEletrica: number,
  gastoComAguaEsgoto: number,
  gastoComGas: number,
  gastoComAlimentacaoHigieneLimpeza: number,
  gastoComMedicamento: number,
  totalDeDespesasMensais: number,
  observacoes: number,
  observacao: string
}

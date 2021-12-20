export interface token{
  idUsuario:string;
  senha?:string;
  funcionario: boolean;
  perfilAcesso: string;
  acessoInicial?:boolean;
  token:string;
  assentamento?:boolean;
  novaSenha?: boolean
}

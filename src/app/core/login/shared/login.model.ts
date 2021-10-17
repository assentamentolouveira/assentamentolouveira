export interface login {
  idUsuario:string;
  senha?:string;
  acessoInicial?:boolean;
  token?:string;
  perfilAcesso?: string,
  novaSenha?: boolean,
  funcionario?: boolean,
}

export interface tokenBackEnd{
  IdUsuario:string;
  Senha?:string;
  Funcionario: boolean;
  PerfilAcesso: string;
  AcessoInicial?:boolean;
  Token:string;
}

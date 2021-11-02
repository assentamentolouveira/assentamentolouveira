export interface tokenBackEnd{
  IdUsuario:string;
  Senha?:string;
  Nome:string;
  Funcionario: boolean;
  PerfilAcesso: string;
  AcessoInicial?:boolean;
  Token:string;
}

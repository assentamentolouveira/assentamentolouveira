export interface newUser {
  id?: string;
  cpf:string;
  senha:string;
  dataNascimento:Date;
  token?:string;
  nomePai:string;
  nomeMae:string;
  funcionario?: boolean;
  acessoInicial?: boolean;
  perfilAcesso?: string;
  novaSenha?: boolean
}

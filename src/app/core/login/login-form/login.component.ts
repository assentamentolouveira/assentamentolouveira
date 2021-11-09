import { PoNotificationService } from '@po-ui/ng-components';
import { LoginService } from './../shared/login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { token } from '../shared/token.model';
import { login } from '../shared/login.model';
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginFormatado = ''
  public habilitaNovoUsuario = this.loginService.isInternet ? '/internet/newuser' : '';

  private valorAtual = '';
  private valorAntigo = '';
  private tituloDaPagina = this.loginService.isInternet ? 'Internet' : 'Intranet'
  literaisPersonalizadas = {
    welcome: `Gerenciamento de Assentamentos - ${this.tituloDaPagina}`,
    loginPlaceholder: 'Informe o seu CPF',
    loginHint: "Informe o CPF do Titular para realizar o login. Caso ainda não possua usuário criado, selecione a opção 'Novo Usuário'",
    titlePopover: 'É novo por aqui? Crie o seu usuário através do botão Novo Usuário',
    loginErrorPattern: "CPF Inválido",
    registerUrl: "Novo Usuário"
  }
  carregando = false;

  constructor(private loginService: LoginService, private poNotificationService: PoNotificationService, private router: Router) { }

  @ViewChild('formularioLogin') formularioLogin: any;

  ngOnInit() {
  }

  informaCaracterLogin(valorRecebido: string) {
    let loginTradado: string;
    this.valorAtual = valorRecebido
    if (this.valorAntigo !== this.valorAtual) {
      loginTradado = this.formularioLogin.login
      loginTradado = loginTradado.replace(/\D/g, "")                    //Remove tudo o que não é dígito
      if (loginTradado.length === 4) {
        loginTradado = loginTradado.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
        this.loginFormatado = loginTradado
        this.valorAntigo = this.valorAtual;

      }
      if (loginTradado.length === 7) {
        loginTradado = loginTradado.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
        loginTradado = loginTradado.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
        this.loginFormatado = loginTradado
        this.valorAntigo = this.valorAtual;

      }
      if (loginTradado.length >= 9 && loginTradado.length <= 11) {
        loginTradado = loginTradado.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
        loginTradado = loginTradado.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
        loginTradado = loginTradado.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
        this.loginFormatado = loginTradado
        this.valorAntigo = this.valorAtual;
      }
      if (valorRecebido.length > 14) {
        this.loginFormatado = loginTradado
        this.valorAntigo = this.valorAtual;
      }
    }
  }

  login(dadosDoLogin: any) {
    this.carregando = true;
    dadosDoLogin.login = dadosDoLogin.login.replace(/\D/g, "");
    this.loginService.realizaLogin({ idUsuario: dadosDoLogin.login, senha: dadosDoLogin.password }).pipe(finalize(() => this.carregando = false)).subscribe(
      (sucesso: token) => {
        this.loginService.gravaUsuario(sucesso);
        if (this.loginService.isInternet) {
          this.router.navigate(['/internet'])
        } else {
          if (sucesso.novaSenha) {
            this.router.navigate(['/intranet/newPassword'])
          } else if (sucesso.funcionario) {
            this.loginService.gravaUsuario(sucesso);
            this.router.navigate(['/intranet'])
          } else {
            this.poNotificationService.error("Usuário informado não é um funcionário")
          }
        }
      }
      , error => { this.poNotificationService.error(`Ocorreu um erro no momento do login: ${error.message}`) }
    );
  }

}

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
  private valorAtual = '';
  private valorAntigo = '';
  private tituloDaPagina = this.loginService.isInternet ? 'Internet' : 'Intranet'
  literaisPersonalizadas = {
    welcome: `Gerenciamento de Assentamentos - ${this.tituloDaPagina}`,
    loginPlaceholder: 'Informe o seu CPF',
    loginHint: "Informe o CPF do Titular para realizar o login. Caso ainda não possua usuário criado, selecione a opção 'Novo Registro'",
    titlePopover: 'É novo por aqui? Crie o seu usuário através do botão Novo Usuário',
    loginErrorPattern: "CPF Inválido"
  }
  carregando = false;

  constructor(private loginService: LoginService, private poNotificationService: PoNotificationService, private router: Router) { }

  @ViewChild('aaa') aaa: any;

  ngOnInit() {
  }

  teste(a: any) {
    let testea
    this.valorAtual = a
    if (this.valorAntigo !== this.valorAtual) {
      testea = this.aaa.login
      testea = testea.replace(/\D/g, "")                    //Remove tudo o que não é dígito
      if (testea.length  === 4) {
        testea = testea.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
        this.loginFormatado = testea
        this.valorAntigo = this.valorAtual;

      }
      if (testea.length === 7) {
        testea = testea.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
        testea = testea.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
        //de novo (para o segundo bloco de números)
        this.loginFormatado = testea
        this.valorAntigo = this.valorAtual;

      }
      if (testea.length >= 9 && testea.length <= 11) {
        testea = testea.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
        testea = testea.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
        //de novo (para o segundo bloco de números)
        testea = testea.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
        this.loginFormatado = testea
        this.valorAntigo = this.valorAtual;
      }
      if (a.length > 14) {
        this.loginFormatado = testea
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
          this.router.navigate(['/intranet'])
        }
      }
      , error => { this.poNotificationService.error(`Ocorreu um erron o momento do login: ${error.message}`) }
    );
  }

}

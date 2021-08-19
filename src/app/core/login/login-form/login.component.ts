import { PoNotificationService } from '@po-ui/ng-components';
import { LoginService } from './../shared/login.service';
import { Component, OnInit } from '@angular/core';
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

  private tituloDaPagina = this.loginService.isInternet ? 'Internet' : 'Intranet'
  literaisPersonalizadas = {
    welcome: `Gerenciamento de Assentamentos - ${this.tituloDaPagina}`,
    loginPlaceholder: 'Informe o seu CPF',
    titlePopover: 'É novo por aqui? Crie o seu usuário através do botão Novo Usuário'
  }
  carregando = false;

  constructor(private loginService: LoginService, private poNotificationService: PoNotificationService, private router: Router) { }

  ngOnInit() {
  }

  login(dadosDoLogin: any) {
    this.carregando = true
    this.loginService.realizaLogin({ idUsuario: dadosDoLogin.login, senha: dadosDoLogin.password }).pipe(finalize(() => this.carregando = false)).subscribe(
      (sucesso: token) => {
        this.loginService.gravaUsuario(sucesso);
        if (this.loginService.isInternet) {
          this.router.navigate(['/internet'])
        } else {
          this.router.navigate(['/intranet'])
        }
      }
      , error => { this.poNotificationService.error(`Ocorreu um erron o momento do login: ${error.error.message}`), console.log(error) }
    );
  }

}

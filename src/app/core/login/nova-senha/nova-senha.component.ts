import { login } from 'src/app/core/login/shared/login.model';
import { PoNotificationService } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { LoginService } from './../shared/login.service';
import { Component, OnInit } from '@angular/core';
import { NewUserService } from '../shared/newUser.service';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.css']
})
export class NovaSenhaComponent implements OnInit {

  public urlVoltar = this.router.url.includes('intranet') ? '/intranet/login' : '/internet/login';
  constructor(private loginService: LoginService, private router: Router, private newUser: NewUserService, private poNotificationService: PoNotificationService) {
  }

  ngOnInit(): void {

  }

  gravaSenha(dados: any): void {
    const usuario = {
      idUsuario: String(sessionStorage.getItem("usuario")),
      senha: dados.currentPassword
    }
    this.loginService.realizaLogin(usuario).subscribe(
      res => {
        this.newUser.alteraUsuario(dados.newPassword).subscribe(
          res => {
            this.poNotificationService.success("Senha alterada com sucesso!");
            if (this.loginService.isInternet) {
              this.router.navigate(['/internet'])
            } else {
              this.router.navigate(['/intranet'])
            }

          }
          , error => this.poNotificationService.error("Erro ao tentar alterar a senha. Tente novamente")
        )
      }
      , error => this.poNotificationService.error("A senha atual está incorreta.")
    )
    console.log(dados)
    currentPassword: "123"
    newPassword: "123"
  }

}

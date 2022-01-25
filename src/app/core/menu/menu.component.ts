import { login } from './../login/shared/login.model';
import { LoginService } from './../login/shared/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';

import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menus: Array<PoMenuItem>;
  logo: string;
  private dadosUsuario: login;

  constructor(private router: Router, private loginService: LoginService) {
    this.logo = `../../../${environment.imagesPath}//brasao-removebg-preview.png`;
    this.dadosUsuario = this.loginService.getTipoFuncionario()
  }

  ngOnInit(): void {
    this.setHomeInfo();
  }

  private setHomeInfo(): void {
    this.menus = this.getMenus();
  }

  private getMenus(): Array<PoMenuItem> {
    const menu: Array<PoMenuItem> = [
      {
        label: 'Home',
        action: () => {
          this.router.navigate(['/intranet']);
        },
        shortLabel: 'Home',
        icon: 'po-icon-home',
      },
      {
        label: 'Cadastrar',
        shortLabel: 'Cadastrar',
        action: () => {
          this.router.navigate(['/intranet/titulares']);
        },
        icon: 'po-icon-users',
      },
      {
        label: 'Consulta',
        shortLabel: 'Consulta',
        action: () => {
          this.router.navigate(['/intranet/assentamentos']);
        },
        icon: 'po-icon-warehouse',
      }
    ];

    if (this.dadosUsuario.perfilAcesso === 'Administrador') {
      menu.push({
        label: 'Configuração',
        shortLabel: 'Config.',
        icon: 'po-icon po-icon-settings',
        subItems: [
          {
            label: 'Usuários',
            shortLabel: 'Usuários',
            action: () => {
              this.router.navigate(['/intranet/configuracoes']);
            },
          },
          {
            label: 'Lista Hier.',
            shortLabel: 'Proc.',
            action: () => {
              this.router.navigate(['/intranet/processamento']);
            },
          }
        ],
      })
    }

    // menu.push({
    //   label: 'Alterar Sennha',
    //   shortLabel: 'Alt. Senha',
    //   action: () => {
    //     this.router.navigate(['/intranet/newPassword']);
    //   },
    //   icon: 'po-icon-lock',
    // })

    menu.push({
      label: 'Sair',
      shortLabel: 'Sair',
      action: () => {
        this.loginService.realizaLogout();
      },
      icon: 'po-icon-exit',
    })
    return menu;
  }

}

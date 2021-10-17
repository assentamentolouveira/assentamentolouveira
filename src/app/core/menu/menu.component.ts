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

  constructor(private router: Router, private loginService: LoginService) {
    this.logo = `../../../${environment.imagesPath}//brasao-removebg-preview.png`;
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
        label: 'Titulares',
        shortLabel: 'Titulares',
        action: () => {
          this.router.navigate(['/intranet/titulares']);
        },
        icon: 'po-icon-users',
      },
      {
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
        ],
      },
      {
        label: 'Sair',
        shortLabel: 'Sair',
        action: () => {
          this.loginService.realizaLogout();
        },
        icon: 'po-icon-exit',
      },
    ];
    return menu;
  }
}

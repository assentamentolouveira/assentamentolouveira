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

  constructor(private router: Router) {
    this.logo = `../../../${environment.imagesPath}//logo_louveira.png`;
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
        label: 'Cadastros',
        shortLabel: 'Cadastros',
        icon: 'po-icon po-icon-company',
        subItems: [
          {
            label: 'Titulares',
            shortLabel: 'Titulares',
            action: () => {
              this.router.navigate(['/intranet/titulares']);
            },
          },
          {
            label: 'Dependentes',
            shortLabel: 'Dependentes',
            action: () => {
              this.router.navigate(['/intranet/dependentes']);
            },
          },
          {
            label: 'Contemplação',
            shortLabel: 'Contemplação',
            action: () => {
              this.router.navigate(['']);
            },
          },
        ],
      },
      {
        label: 'Configuração',
        shortLabel: 'Configuração',
        icon: 'po-icon po-icon-settings',
        subItems: [
          {
            label: 'Usuários',
            shortLabel: 'Usuários',
            action: () => {
              this.router.navigate(['']);
            },
          },
        ],
      },
    ];
    return menu;
  }
}

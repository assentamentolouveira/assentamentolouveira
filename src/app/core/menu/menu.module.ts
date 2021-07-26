import { PoUiComponentsModule } from './../../shared/Modulos/po-ui-components.module';
import { NgModule } from '@angular/core';

import { MenuComponent } from './menu.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuRoutingModule } from './menu-routing.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    MenuRoutingModule,
    PoUiComponentsModule,
    CommonModule,
    RouterModule
  ],
  exports: [MenuComponent]
})
export class MenuModule { }

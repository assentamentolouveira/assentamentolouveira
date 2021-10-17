import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { ConfiguracoesListComponent } from './configuracoes-list/configuracoes-list.component';
import { SharedModule } from 'src/app/shared/Modulos/shared.module';
import { PoUiComponentsModule } from 'src/app/shared/Modulos/po-ui-components.module';
import { ConfiguracoesFormComponent } from './configuracoes-form/configuracoes-form.component';


@NgModule({
  declarations: [
    ConfiguracoesListComponent,
    ConfiguracoesFormComponent
  ],
  imports: [SharedModule, PoUiComponentsModule, ConfiguracoesRoutingModule],
  exports: [ConfiguracoesListComponent, ConfiguracoesFormComponent]
})
export class ConfiguracoesModule { }

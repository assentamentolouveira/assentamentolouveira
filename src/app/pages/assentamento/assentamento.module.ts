import { MoradiaModule } from './../moradia/moradia.module';
import { DependentesModule } from './../dependentes/dependentes.module';
import { TitularesModule } from './../titulares/titulares.module';
import { SharedModule } from './../../shared/Modulos/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssentamentoRoutingModule } from './assentamento-routing.module';
import { AssentamentoFormComponent } from './assentamento-form/assentamento-form.component';
import { AssentamentoListComponent } from './assentamento-list/assentamento-list.component';
import { PoUiComponentsModule } from 'src/app/shared/Modulos/po-ui-components.module';


@NgModule({
  declarations: [AssentamentoFormComponent, AssentamentoListComponent],
  imports: [
    CommonModule,
    PoUiComponentsModule,
    SharedModule,
    AssentamentoRoutingModule,
    TitularesModule,
    DependentesModule,
    MoradiaModule,
  ]
})
export class AssentamentoModule { }

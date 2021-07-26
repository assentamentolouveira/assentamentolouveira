import { SharedModule } from './../../shared/Modulos/shared.module';
import { PoUiComponentsModule } from './../../shared/Modulos/po-ui-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoradiaRoutingModule } from './moradia-routing.module';
import { MoradiaListComponent } from './moradia-list/moradia-list.component';
import { MoradiaFormComponent } from './moradia-form/moradia-form.component';


@NgModule({
  declarations: [
    MoradiaListComponent,
    MoradiaFormComponent
  ],
  imports: [
    CommonModule,
    PoUiComponentsModule,
    SharedModule,
    MoradiaRoutingModule
  ],
  exports:[MoradiaFormComponent]
})
export class MoradiaModule { }

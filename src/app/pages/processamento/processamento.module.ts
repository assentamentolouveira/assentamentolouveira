import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessamentoFormComponent } from './processamento-form/processamento-form.component';
import { PoUiComponentsModule } from 'src/app/shared/Modulos/po-ui-components.module';
import { ProcessamentoRoutingModule } from './processamento-routing.module';
import { SharedModule } from 'src/app/shared/Modulos/shared.module';



@NgModule({
  declarations: [
    ProcessamentoFormComponent
  ],
  imports: [
    CommonModule,
    PoUiComponentsModule,
    SharedModule,
    ProcessamentoRoutingModule
  ]
})
export class ProcessamentoModule { }

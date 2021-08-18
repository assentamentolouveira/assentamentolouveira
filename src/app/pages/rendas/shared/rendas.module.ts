import { SharedModule } from './../../../shared/Modulos/shared.module';
import { PoUiComponentsModule } from './../../../shared/Modulos/po-ui-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RendasComponent } from '../rendas-form/rendas.component';

@NgModule({
  imports: [
    CommonModule,
    PoUiComponentsModule,
    SharedModule
  ],
  declarations: [RendasComponent],
  exports: [RendasComponent]
})
export class RendasModule { }

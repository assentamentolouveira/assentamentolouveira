import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  PoLoadingModule,
  PoMenuModule,
  PoModule,
  PoNotificationModule,
  PoPageModule,
} from '@po-ui/ng-components';
import { PoPageLoginModule } from '@po-ui/ng-templates';



@NgModule({
  imports: [
    PoMenuModule,
    PoLoadingModule,
    CommonModule,
    PoModule,
    PoNotificationModule,
    PoPageModule,
    PoPageLoginModule,
  ],
  exports: [
    PoMenuModule,
    PoLoadingModule,
    CommonModule,
    PoModule,
    PoNotificationModule,
    PoPageModule,
    PoPageLoginModule
  ],
})
export class PoUiComponentsModule {}

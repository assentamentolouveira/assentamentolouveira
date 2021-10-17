import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  PoLoadingModule,
  PoMenuModule,
  PoModule,
  PoNotificationModule,
  PoPageModule,
} from '@po-ui/ng-components';
import { PoPageChangePasswordModule, PoPageLoginModule } from '@po-ui/ng-templates';



@NgModule({
  imports: [
    PoMenuModule,
    PoLoadingModule,
    CommonModule,
    PoModule,
    PoNotificationModule,
    PoPageModule,
    PoPageLoginModule,
    PoPageChangePasswordModule,
  ],
  exports: [
    PoMenuModule,
    PoLoadingModule,
    CommonModule,
    PoModule,
    PoNotificationModule,
    PoPageModule,
    PoPageLoginModule,
    PoPageChangePasswordModule
  ],
})
export class PoUiComponentsModule {}

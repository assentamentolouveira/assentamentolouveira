import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  PoButtonModule,
  PoContainerModule,
  PoDividerModule,
  PoFieldModule,
  PoLoadingModule,
  PoMenuModule,
  PoModule,
  PoNotificationModule,
  PoPageModule,
  PoTableModule,
  PoTagModule,
  PoWidgetModule,
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
    PoDividerModule,
    PoFieldModule,
    PoButtonModule,
    PoTableModule,
    PoWidgetModule,
    PoTagModule,
    PoTableModule,
    PoContainerModule
  ],
  exports: [
    PoMenuModule,
    PoLoadingModule,
    CommonModule,
    PoModule,
    PoNotificationModule,
    PoPageModule,
    PoPageLoginModule,
    PoPageChangePasswordModule,
    PoDividerModule,
    PoFieldModule,
    PoButtonModule,
    PoTableModule,
    PoWidgetModule,
    PoTagModule,
    PoTableModule,
    PoContainerModule
  ],
})
export class PoUiComponentsModule {}

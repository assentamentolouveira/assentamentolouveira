import { SharedModule } from '../../shared/Modulos/shared.module';
import { PoUiComponentsModule } from '../../shared/Modulos/po-ui-components.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermoAceiteComponent } from '../pages/termo-aceite/termo-aceite.component';
import { InternetRoutes } from './internet.routing';
import { HomeInternetFormComponent } from '../pages/home/home-internet-form/home-internet-form.component';


@NgModule({
  declarations: [TermoAceiteComponent, HomeInternetFormComponent],
  imports: [
    PoUiComponentsModule,
    SharedModule,
    InternetRoutes,
  ],
  exports: [
    TermoAceiteComponent
  ]
})
export class InternetModule { }

import { PoUiComponentsModule } from './../../shared/Modulos/po-ui-components.module';
import { SharedModule } from './../../shared/Modulos/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PoUiComponentsModule,
    RouterModule.forChild(routes)
  ],
  exports: [HomeComponent],
  declarations: [HomeComponent]
})
export class HomeModule { }

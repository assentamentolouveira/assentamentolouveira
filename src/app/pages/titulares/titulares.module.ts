import { RendasModule } from './../rendas/shared/rendas.module';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/Modulos/shared.module';
import { TitularesRoutingModule } from './titulares-routing.module';
import { TitularesFormComponent } from './titulares-form/titulares-form.component';
import { TitularesListComponent } from './titulares-list/titulares-list.component';

@NgModule({
  declarations: [TitularesFormComponent, TitularesListComponent],
  imports: [SharedModule, TitularesRoutingModule, RendasModule],
  exports: [TitularesFormComponent]
})
export class TitularesModule {}

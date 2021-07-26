import { NgModule } from '@angular/core';

import { DependentesRoutingModule } from './dependentes-routing.module';
import { DependentesFormComponent } from './dependentes-form/dependentes-form.component';
import { DependentesListComponent } from './dependentes-list/dependentes-list.component';
import { SharedModule } from './../../shared/Modulos/shared.module';

@NgModule({
  declarations: [DependentesFormComponent, DependentesListComponent],
  imports: [SharedModule, DependentesRoutingModule],
})
export class DependentesModule {}

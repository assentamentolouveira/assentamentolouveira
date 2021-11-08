import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssentamentoFormComponent } from '../assentamento/assentamento-form/assentamento-form.component';

import { TitularesFormComponent } from './titulares-form/titulares-form.component';
import { TitularesListComponent } from './titulares-list/titulares-list.component';

const routes: Routes = [
  { path: '', component: TitularesListComponent },
  { path: 'novo', component: AssentamentoFormComponent },
  { path: ':id/editar', component: AssentamentoFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TitularesRoutingModule {}

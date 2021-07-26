import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TitularesFormComponent } from './titulares-form/titulares-form.component';
import { TitularesListComponent } from './titulares-list/titulares-list.component';

const routes: Routes = [
  { path: '', component: TitularesListComponent },
  { path: 'novo', component: TitularesFormComponent },
  { path: ':id/editar', component: TitularesFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TitularesRoutingModule {}

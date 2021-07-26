import { DependentesFormComponent } from './dependentes-form/dependentes-form.component';
import { DependentesListComponent } from './dependentes-list/dependentes-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: DependentesListComponent },
  { path: 'novo', component: DependentesFormComponent },
  { path: ':id/editar', component: DependentesFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DependentesRoutingModule {}

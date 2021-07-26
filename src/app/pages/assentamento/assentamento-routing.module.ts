import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssentamentoFormComponent } from './assentamento-form/assentamento-form.component';
import { AssentamentoListComponent } from './assentamento-list/assentamento-list.component';

const routes: Routes = [
  { path: '', component: AssentamentoListComponent },
  { path: 'novo', component: AssentamentoFormComponent },
  { path: ':id/editar', component: AssentamentoFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssentamentoRoutingModule { }

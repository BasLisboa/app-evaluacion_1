import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarSedePage } from './mostrar-sede.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarSedePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarSedePageRoutingModule {}

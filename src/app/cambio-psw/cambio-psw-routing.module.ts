import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioPswPage } from './cambio-psw.page';

const routes: Routes = [
  {
    path: '',
    component: CambioPswPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioPswPageRoutingModule {}

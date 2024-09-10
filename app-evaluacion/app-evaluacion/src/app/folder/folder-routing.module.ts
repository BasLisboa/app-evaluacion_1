import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { folderPage } from './folder.page';

const routes: Routes = [
  {
    path: '',
    component: folderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class folderPageRoutingModule {}





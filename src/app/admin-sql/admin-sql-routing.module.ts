import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminSqlPage } from './admin-sql.page';

const routes: Routes = [
  {
    path: '',
    component: AdminSqlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSqlPageRoutingModule {}

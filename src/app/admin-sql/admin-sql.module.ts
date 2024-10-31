import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminSqlPageRoutingModule } from './admin-sql-routing.module';

import { AdminSqlPage } from './admin-sql.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminSqlPageRoutingModule
  ],
  declarations: [AdminSqlPage]
})
export class AdminSqlPageModule {}

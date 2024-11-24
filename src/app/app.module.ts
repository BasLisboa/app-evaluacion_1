//*******************************************************************************/
//*                                   DUOC                                      */
//*******************************************************************************/
//* Proyecto: Modulos app                                                       */
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 30-08-2024                                                           */
//*******************************************************************************/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { HttpClientModule } from '@angular/common/http';

import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SesionActivaService } from './services/sesion-activa.service'; 
import { SessionGuard } from './session.guard';



@NgModule({
  declarations: [
    AppComponent, MenuPrincipalComponent
  ],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite, SesionActivaService,SessionGuard,AppRoutingModule
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [
    MenuPrincipalComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {

}

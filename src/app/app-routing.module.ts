//*******************************************************************************/
//*                                   SecGar                                    */
//*******************************************************************************/
//* Proyecto: Cambio psw movil                                                  */
//* Desarrollador: Bastian Lisboa                  yyyy                             */
//* Fecha: 03-09-2024                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 03-09-2024                                                           */
//* Descripcion: Creacion de rutas                                              */
//*-----------------------------------------------------------------------------*/
//*******************************************************************************/
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SessionGuard } from './session.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cambio-psw',
    loadChildren: () => import('./cambio-psw/cambio-psw.module').then( m => m.CambioPswPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'admin-sql',
    loadChildren: () => import('./admin-sql/admin-sql.module').then( m => m.AdminSqlPageModule)
  },
  {
    path: 'mostrar-sede',
    loadChildren: () => import('./mostrar-sede/mostrar-sede.module').then( m => m.MostrarSedePageModule)
  }


];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

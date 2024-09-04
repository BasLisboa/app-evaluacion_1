//*******************************************************************************/
//*                                   SecGar                                    */
//*******************************************************************************/
//* Proyecto: Cambio psw movil                                                  */
//* Desarrollador: Bastian Lisboa && Daniel Galvez                              */
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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cambio-psw',
    loadChildren: () => import('./cambio-psw/cambio-psw.module').then( m => m.CambioPswPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './providers/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    loadChildren: './home/home.module#HomePageModule',
  },
  {
    path: 'list',
    canActivate: [AuthGuardService],
    loadChildren: './list/list.module#ListPageModule',
  },
  {
    path: 'mis-visitas',
    canActivate: [AuthGuardService],
    loadChildren: './modules/mis-visitas/mis-visitas.module#MisVisitasPageModule',
  },
  {
    path: 'mis-estudios',
    canActivate: [AuthGuardService],
    loadChildren: './modules/mis-estudios/mis-estudios.module#MisEstudiosPageModule',
  },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

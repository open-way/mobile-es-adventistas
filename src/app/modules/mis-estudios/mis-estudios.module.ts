import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MisEstudiosPage } from './mis-estudios.page';
import { EstudioBiblicosService } from './providers';

const routes: Routes = [
  {
    path: '',
    component: MisEstudiosPage,
  },
  {
    path: 'new-estudio',
    loadChildren: './new-estudio/new-estudio.module#NewEstudioPageModule',
  },
  {
    path: ':estudioId',
    loadChildren: './avance-estudio/avance-estudio.module#AvanceEstudioPageModule',
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MisEstudiosPage],
  providers: [
    // EstudioBiblicosService,
  ],
})
export class MisEstudiosPageModule { }

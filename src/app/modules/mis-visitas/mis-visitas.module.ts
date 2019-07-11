import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MisVisitasPage } from './mis-visitas.page';

const routes: Routes = [
  {
    path: '',
    component: MisVisitasPage,
  },
  { path: 'new-visita', loadChildren: './new-visita/new-visita.module#NewVisitaPageModule' },
  { path: 'visitados/:idVisita', loadChildren: './visitados/visitados.module#VisitadosPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MisVisitasPage]
})
export class MisVisitasPageModule {}

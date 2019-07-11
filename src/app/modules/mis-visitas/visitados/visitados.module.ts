import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VisitadosPage } from './visitados.page';
import { AddVisitadoPageModule } from '../add-visitado/add-visitado.module';
import { SearchVisitadoPageModule } from '../search-visitado/search-visitado.module';

const routes: Routes = [
  {
    path: '',
    component: VisitadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),


  ],
  declarations: [VisitadosPage]
})
export class VisitadosPageModule { }

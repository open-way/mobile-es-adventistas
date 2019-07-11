import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AvanceEstudioPage } from './avance-estudio.page';

const routes: Routes = [
  {
    path: '',
    component: AvanceEstudioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AvanceEstudioPage]
})
export class AvanceEstudioPageModule {}

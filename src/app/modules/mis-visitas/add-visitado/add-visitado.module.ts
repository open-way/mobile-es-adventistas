import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddVisitadoPage } from './add-visitado.page';

const routes: Routes = [
  {
    path: '',
    component: AddVisitadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddVisitadoPage],
  // entryComponents: [
  //   AddVisitadoPage,
  // ],
})
export class AddVisitadoPageModule { }

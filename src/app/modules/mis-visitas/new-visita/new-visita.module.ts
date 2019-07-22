import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewVisitaPage } from './new-visita.page';
import { Camera } from '@ionic-native/camera/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { IonicErrorHandler } from 'ionic-angular';

const routes: Routes = [
  {
    path: '',
    component: NewVisitaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    // Camera,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    // { provide: ErrorHandler, useClass: IonicErrorHandler },
  ],
  declarations: [NewVisitaPage],
})
export class NewVisitaPageModule { }

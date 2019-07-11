import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { InterceptorsModule } from './providers/interceptors/interceptors.module';
import { SearchVisitadoPageModule } from './modules/mis-visitas/search-visitado/search-visitado.module';
import { AddVisitadoPageModule } from './modules/mis-visitas/add-visitado/add-visitado.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    InterceptorsModule,
    AppRoutingModule,
    IonicStorageModule.forRoot(),

    AddVisitadoPageModule,
    SearchVisitadoPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

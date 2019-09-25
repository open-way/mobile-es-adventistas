import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './providers/resources';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // public user = {
  //   full_name: '',
  //   email: '',
  //   picture: null,
  // };
  // public enterprise = {
  //   union_nombre: '',
  //   mision_asociacion_nombre: '',
  //   distrito_misionero_nombre: '',
  //   iglesia_nombre: '',
  // };
  public appPages = [
    // {
    //   title: 'Home',
    //   url: '/home',
    //   icon: 'home'
    // },
    // {
    //   title: 'List',
    //   url: '/list',
    //   icon: 'list'
    // },
    {
      title: 'Mis estudios',
      url: '/mis-estudios',
      icon: 'home'
    },
    {
      title: 'Mis visitas',
      url: '/mis-visitas',
      icon: 'home'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  
}

import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SettingsComponent } from './settings/settings.component';
import { AuthService } from '../providers/resources';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private currentPopover = null;
  public user = {
    full_name: '',
    email: '',
    picture: null,
  };
  public enterprise = {
    union_nombre: '',
    mision_asociacion_nombre: '',
    distrito_misionero_nombre: '',
    iglesia_nombre: '',
  };

  constructor(public popoverController: PopoverController,
    private router: Router,
    private authService: AuthService,
    ) {
    this.initDataUser();
  }


  public initDataUser(){
    this.authService.authenticationState.subscribe(state => {
      this.authService.getToken().then(res => {
        if (res) {
          this.getInfoUser();
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['login']);
        }
      }, err => {
        this.router.navigate(['login']);
      });
    });

    this.authService.getToken().then(res => {
      if (res) {
        this.getInfoUser();
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['login']);
      }
    }, err => {
      this.router.navigate(['login']);
    });
  }

  private getInfoUser() {
    this.authService.user()
      .subscribe(response => {
        if (response) {
          this.user.email = response.email;
          this.user.full_name = response.name;
        }
      });
  }

  public async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: SettingsComponent,
      event: ev,
      translucent: true,
    });
    this.currentPopover = popover;
    return await popover.present();
  }

  private dismissPopover() {
    if (this.currentPopover) {
      this.currentPopover.dismiss().then(() => {
        console.log('hol');
        
        this.currentPopover = null;
       });
    }
  }

}

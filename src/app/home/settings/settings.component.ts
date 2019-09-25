

import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/providers/resources';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss'],
})
export class SettingsComponent {

  constructor(public popoverController: PopoverController,
    private authService: AuthService,
    ) { }
  
  // public myPerfil() {
  //   this.popoverController.dismiss();
  // }
  
  public cerrarSesion() {
    this.onLoggout();
    this.popoverController.dismiss();
  }

  public onLoggout() {
    this.authService.logout()
      .subscribe(() => {
        // this.router.navigate(['login']);
      });
  }
}

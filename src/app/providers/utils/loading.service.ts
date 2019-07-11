import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
// @Injectable()
export class LoadingService {

    // constructor(
    //     private loadingCtrl: LoadingController,
    // ) { }

    // public async show(message: string, spinner: any = 'crescent') {
    //     const loading = await this.loadingCtrl.create({
    //         message,
    //         spinner,
    //         // duration: 2000
    //     });
    //     loading.present();
    //     return loading;
    // }

    isLoading = false;

    constructor(public loadingController: LoadingController) { }

    async present(message: string, spinner: any = 'crescent') {
        this.isLoading = true;
        return await this.loadingController.create({
            message,
            spinner,
            // duration: 5000,
        }).then(a => {
            a.present().then(() => {
                // console.log('presented');
                if (!this.isLoading) {
                    a.dismiss().then(() => {
                        // console.log('abort presenting');
                    });
                }
            });
        });
    }

    async dismiss() {
        this.isLoading = false;
        return await this.loadingController.dismiss().then(() => {
            // console.log('dismissed');
        });
    }
}

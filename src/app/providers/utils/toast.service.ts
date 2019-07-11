import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ToastService {
    constructor(private toastController: ToastController) { }

    public async show(message: string, duration: number = 3000) {
        const toast = await this.toastController.create({
            message,
            duration,
        });
        toast.present();
    }
}

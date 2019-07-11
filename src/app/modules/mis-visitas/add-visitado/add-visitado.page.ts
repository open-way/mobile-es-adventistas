import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-visitado',
  templateUrl: './add-visitado.page.html',
  styleUrls: ['./add-visitado.page.scss'],
})
export class AddVisitadoPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  public dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

}

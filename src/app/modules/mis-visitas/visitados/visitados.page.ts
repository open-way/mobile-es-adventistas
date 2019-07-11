import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { SearchVisitadoPage } from '../search-visitado/search-visitado.page';
// import { AddVisitadoPage } from '../add-visitado/add-visitado.page';

@Component({
  selector: 'app-visitados',
  templateUrl: './visitados.page.html',
  styleUrls: ['./visitados.page.scss'],
})
export class VisitadosPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  // public async searchVisitado() {
  //   const modal = await this.modalController.create({
  //     component: SearchVisitadoPage,
  //   });
  //   return await modal.present();
  // }

  // public async addVisitado() {
  //   const modal = await this.modalController.create({
  //     component: AddVisitadoPage,
  //   });
  //   return await modal.present();
  // }
}

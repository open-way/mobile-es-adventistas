import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SearchVisitadoPage } from '../search-visitado/search-visitado.page';
import { AddVisitadoPage } from '../add-visitado/add-visitado.page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IndicadorsService, VisitaMisionerasService } from '../providers';
import { map } from 'rxjs/operators';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-new-visita',
  templateUrl: './new-visita.page.html',
  styleUrls: ['./new-visita.page.scss'],
})
export class NewVisitaPage implements OnInit {
  public nuevaVisitaForm: FormGroup;
  public miembrosSeleccionados: any[] = [];
  public indicadors: any[] = [];

  constructor(
    private router: Router,
    public modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private indicadorsService: IndicadorsService,
    private visitaMisionerasService: VisitaMisionerasService,

    private camera: Camera,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getMasters();
  }


  /*
  public takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
  */

  public getMasters() {
    this.indicadorsService.getAll$()
      .pipe(map(res => res.data))
      .subscribe(response => {
        this.indicadors = response;
      });
  }
  public buildForm() {
    const controls = {
      fecha_visita: ['', [Validators.required]],
      tema_abordado: [''],
      anio: [new Date().getFullYear(), [Validators.required]],
      persona_visitadas: [],

      iglesia_id: [],
      distrito_misionero_id: [],
      mision_asociacion_id: [],
      union_id: [],
    };
    this.nuevaVisitaForm = this.formBuilder.group(controls);
  }


  // public onSaveVisita() {
  //   this.router.navigate(['../../visitados', 12], { relativeTo: this.activatedRoute });
  // }

  public async searchVisitado() {
    const modal = await this.modalController.create({
      component: SearchVisitadoPage,
    });
    modal.onWillDismiss()
      .then(res => {
        if (res && res.data && res.data.data) {
          const persona = res.data.data.persona;
          // this.miembrosSeleccionados.push(persona);
          this.addVisitadoSelected(persona);
        }
      })
      .catch(err => {
        // console.log('err: ', err);
      });
    return await modal.present();
  }

  public prepareDataToPush(data) {
    const myIndicadors = this.indicadors.map(indicador => {
      return {
        numero_respuesta: 1,
        ...indicador,
      };
    });
    const newpVisitadaSeleccionadoValue = { indicadors: myIndicadors, ...data };
    return newpVisitadaSeleccionadoValue;
  }

  public addVisitadoSelected(persona) {
    const newpVisitadaSeleccionadoValue = this.prepareDataToPush(persona);
    if (!this.miembrosSeleccionados.find(res => res.id === persona.id)) {
      this.miembrosSeleccionados.push(newpVisitadaSeleccionadoValue);
    }
  }

  public async addVisitado() {
    const modal = await this.modalController.create({
      component: AddVisitadoPage,
    });
    return await modal.present();
  }

  public onEliminar(personaId) {
    const visitadoDelete = this.miembrosSeleccionados.map(res => res.id).indexOf(personaId);
    if (visitadoDelete > -1) {
      this.miembrosSeleccionados.splice(visitadoDelete, 1);
    }
  }

  public onSave() {
    const visita = this.nuevaVisitaForm.value;
    const valid = this.nuevaVisitaForm.valid;

    const personaVisitadas = this.miembrosSeleccionados;
    const newData = {
      persona_visitadas: personaVisitadas,
      fecha_visita: visita.fecha_visita,
      anio: visita.anio,
      tema_abordado: visita.tema_abordado,
      foto: visita.foto,
      // mision_asociacion_id: visita.mision_asociacion_id !== 0 ? visita.mision_asociacion_id : null,
      // distrito_misionero_id: visita.distrito_misionero_id !== 0 ? visita.distrito_misionero_id : null,
      // iglesia_id: visita.iglesia_id !== 0 ? visita.iglesia_id : null,
    };

    if (valid && (personaVisitadas.length > 0)) {
      // this.loadingSpinnerSave = true;
      this.visitaMisionerasService.add$(newData)
        .pipe(map(res => res.data))
        .subscribe(response => {
          // this.loadingSpinnerSave = false;
          // this.dialogRef.close({ cancel: false });
          if (response.id) {
            this.router.navigate(['../../mis-visitas']);
          }
        }, err => {
          // this.loadingSpinnerSave = false;
        });
    }
  }
}

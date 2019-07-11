import { Component, OnInit } from '@angular/core';
import { LeccionesService, EstudioBiblicosService } from '../providers';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-estudio',
  templateUrl: './new-estudio.page.html',
  styleUrls: ['./new-estudio.page.scss'],
})
export class NewEstudioPage implements OnInit {
  public leccions: any[] = [];
  public estudianteForm: FormGroup;

  constructor(
    private leccionesService: LeccionesService,
    private estudioBiblicosService: EstudioBiblicosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getMasters();
    this.buildForm();
  }

  private buildForm() {
    const controls = {
      nombres: ['', [Validators.required]],
      ap_paterno: ['', [Validators.required]],
      ap_materno: [''],
      num_doc: [''],
      celular: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      estado_civil: ['', [Validators.required]],
      leccion_id: ['', [Validators.required]],
    };
    this.estudianteForm = this.formBuilder.group(controls);
  }


  private getMasters() {
    this.leccionesService.getByQuery$({ activo: true })
      .pipe(map(res => res.data))
      .subscribe(response => {
        this.leccions = response;
      });
  }

  public onSave() {
    const value = this.estudianteForm.value;
    const valid = this.estudianteForm.valid;


    if (valid) {
      console.log('value: ', value);
      // const leccion_id = value.leccion_id;
      // delete value.leccion_id;

      // const newData = {
      // persona: value,
      // leccion_id,
      // };
      this.estudioBiblicosService.addAllByPastor$(value)
        .pipe(map(res => res.data))
        .subscribe(response => {
          console.log(response);
          // new-estudio
          if (response.id) {
            this.router.navigate(['../../mis-estudios', response.id]);
          }
        });
    }
  }
}

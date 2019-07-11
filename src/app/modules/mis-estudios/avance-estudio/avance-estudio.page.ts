import { Component, OnInit } from '@angular/core';
import { EstudioBiblicosService, EstudioBiblicoCursosService } from '../providers';
import { map, retry } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-avance-estudio',
  templateUrl: './avance-estudio.page.html',
  styleUrls: ['./avance-estudio.page.scss'],
})
export class AvanceEstudioPage implements OnInit {
  public estudioBiblico: any;
  public estudioBiblicoId: any;
  public estudioBiblicoCursos: any[] = [];

  constructor(
    private estudioBiblicosService: EstudioBiblicosService,
    private estudioBiblicoCursosService: EstudioBiblicoCursosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(map(res => res.get('estudioId')))
      .subscribe(estudioId => {
        this.estudioBiblicoId = estudioId;
        this.getEstudioBiblico();
      });
  }

  private getEstudioBiblico() {
    this.estudioBiblicosService.getById$(this.estudioBiblicoId)
      .pipe(map(res => res.data))
      .subscribe(response => {
        this.estudioBiblico = response.estudio_biblico;
        this.estudioBiblicoCursos = response.estudio_biblico_cursos;
      });
  }

  // public updateEstubioBiblicoCurso(id, estado) {
  //   const data = {
  //     estado: !estado,
  //     observacion: 'Evaluado desde la App móvil.'
  //   };
  // this.estudioBiblicoCursosService.update$(id, data)
  //   .pipe(map(res => res.data))
  //   .subscribe(response => {

  //   });
  // }

  public onSave() {
    const estudioBiblicoCursos = this.estudioBiblicoCursos
      .map(res => {
        return {
          id: res.estudio_biblico_curso_id,
          estado: res.estudio_biblico_curso_estado,
          observacion: 'Evaluado desde la App móvil.'
        };
      });
    // console.log('estudioBiblicoCursos:', estudioBiblicoCursos);

    this.estudioBiblicosService
      .updateEstudioBiblicoCursos$(this.estudioBiblicoId, { estudioBiblicoCursos })
      .pipe(map(res => res.data))
      .subscribe(response => {

      });
  }
}

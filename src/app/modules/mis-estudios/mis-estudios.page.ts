import { Component, OnInit } from '@angular/core';
import { EstudioBiblicosService } from './providers';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mis-estudios',
  templateUrl: './mis-estudios.page.html',
  styleUrls: ['./mis-estudios.page.scss'],
})
export class MisEstudiosPage implements OnInit {
  public textSearch = new FormControl('');
  public estudioBiblicos: any[] = [];

  constructor(private estudioBiblicosService: EstudioBiblicosService) { }

  ngOnInit() {
    this.getEstudioBiblicosByPastor();
    this.subscribeFormControl();
  }

  public subscribeFormControl() {
    this.textSearch.valueChanges
      .pipe(
        filter(textSearch => textSearch.trim() !== ''), // contenido no sea vacio(solucion tmp).
        filter(textSearch => textSearch.length > 2), // carga a partir de los 3 dígitos.
        debounceTime(1000),
        distinctUntilChanged(), // contenido sea distinto al anterior
        map(textSearch => textSearch.toLowerCase()), // Convertir a minuscula.
      )
      .subscribe(value => {
        this.getEstudioBiblicosByPastor();
      });
  }

  public doRefresh(event) {
    const textSearch = this.textSearch.value;
    this.estudioBiblicosService.getAllByPastor$({ activo: true, text_search: textSearch })
      .pipe(map(res => res.data))
      .subscribe(response => {
        this.estudioBiblicos = response;
        event.target.complete();
      });
  }

  private getEstudioBiblicosByPastor() {
    const textSearch = this.textSearch.value;
    this.estudioBiblicosService.getAllByPastor$({ activo: true, text_search: textSearch })
      .pipe(map(res => res.data))
      .subscribe(response => {
        this.estudioBiblicos = response;
      });
  }

  public onFinCompleto(estudioBiblicoId) {
    const data = {
      activo: false,
      finalizado_estado: 1,
      finalizado_comentario: 'Finalizado completo del móvil',
    };
    this.estudioBiblicosService.update$(estudioBiblicoId, data)
      .pipe(map(res => res.data))
      .subscribe(response => {
        this.getEstudioBiblicosByPastor();
      });
  }

  public onFinIncompleto(estudioBiblicoId) {
    const data = {
      activo: false,
      finalizado_estado: 2,
      finalizado_comentario: 'Finalizado incompleto del móvil',
    };
    this.estudioBiblicosService.update$(estudioBiblicoId, data)
      .pipe(map(res => res.data))
      .subscribe(response => {
        this.getEstudioBiblicosByPastor();
      });
  }

  public onFinBautismo(estudioBiblicoId) {
    const data = {
      activo: false,
      finalizado_estado: 3,
      finalizado_comentario: 'Finalizado con bautismo del móvil',
    };
    this.estudioBiblicosService.update$(estudioBiblicoId, data)
      .pipe(map(res => res.data))
      .subscribe(response => {
        this.getEstudioBiblicosByPastor();
      });
  }

  public onEliminar(estudioBiblicoId) {
    this.estudioBiblicosService.delete$(estudioBiblicoId)
      .pipe(map(res => res.data))
      .subscribe(response => {
        this.getEstudioBiblicosByPastor();
      });
  }

}

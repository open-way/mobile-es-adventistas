import { Component, OnInit } from '@angular/core';
import { VisitaMisionerasService } from './providers';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mis-visitas',
  templateUrl: './mis-visitas.page.html',
  styleUrls: ['./mis-visitas.page.scss'],
})
export class MisVisitasPage implements OnInit {
  public personasVisitadas: any[] = [];
  public textSearch = new FormControl('');

  constructor(private visitaMisionerasService: VisitaMisionerasService) { }

  ngOnInit() {
    this.getMasters();
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
        this.getMasters();
      });
  }

  private getMasters() {
    const textSearch = this.textSearch.value;
    this.visitaMisionerasService.getAllByPastor$({ text_search: textSearch })
      .pipe(map(res => res.data))
      .subscribe(response => {
        this.personasVisitadas = response;
      });
  }

  public doRefresh(event) {
    const textSearch = this.textSearch.value;
    this.visitaMisionerasService.getAllByPastor$({ text_search: textSearch })
      .pipe(map(res => res.data))
      .subscribe(response => {
        this.personasVisitadas = response;
        event.target.complete();
      });
  }

  public onEliminar(visitaId) {
    this.visitaMisionerasService.delete$(visitaId)
      .pipe(map(res => res.data))
      .subscribe(response => {
        this.getMasters();
      });
  }



}

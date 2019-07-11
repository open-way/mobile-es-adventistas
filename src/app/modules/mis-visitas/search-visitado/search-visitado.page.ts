import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, Validators } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged, map, catchError } from 'rxjs/operators';
import { PersonasService } from '../providers';
import { of } from 'rxjs';

@Component({
  selector: 'app-search-visitado',
  templateUrl: './search-visitado.page.html',
  styleUrls: ['./search-visitado.page.scss'],
})
export class SearchVisitadoPage implements OnInit {

  public searchText = new FormControl('', Validators.required);
  public miembros: any[] = [];

  constructor(
    public modalController: ModalController,
    private personasService: PersonasService,
  ) { }

  ngOnInit() {
    this.subscribeSearchText();
  }

  public subscribeSearchText() {
    this.searchText.valueChanges
      .pipe(
        filter(textSearch => textSearch.trim() !== ''), // contenido no sea vacio(solucion tmp).
        filter(textSearch => textSearch.length > 2), // carga a partir de los 3 dígitos.
        // tap(() => this.loadingSpinnerSearchVisitado = true), // icon spin
        debounceTime(1000),
        distinctUntilChanged(), // contenido sea distinto al anterior
        map(textSearch => textSearch.toLowerCase()), // Convertir a minuscula.
      )
      .subscribe(res => {
        this.getMiembros();
      });
  }

  public getMiembros() {
    const textSearch = this.searchText.value;
    this.personasService.getByQuery$({ text_search: textSearch })
      .pipe(
        catchError(() => of({ data: [] })),
        map(response => response.data)
      ).subscribe(response => {
        this.miembros = response;
      });
  }

  public onSelected(persona) {
    this.modalController.dismiss({
      dismissed: true,
      data: {
        persona,
      },
    });
  }

  public dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

}

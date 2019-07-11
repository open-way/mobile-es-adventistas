import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EstudioBiblicosService {

    public endPoint = 'estudio-biblicos';

    constructor(private httpClient: HttpClient) { }

    public getAllByPastor$(query: any): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/by-pastor`, { params: query });
    }

    public getById$(id: any): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/${id}`);
    }

    public addAllByPastor$(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.endPoint}/by-pastor`, data);
    }

    public delete$(id: any): Observable<any> {
        return this.httpClient.delete<any>(`${this.endPoint}/${id}`);
    }

    public update$(id: any, data: any): Observable<any> {
        return this.httpClient.put<any>(`${this.endPoint}/${id}`, data);
    }

    public updateEstudioBiblicoCursos$(id: any, data: any): Observable<any> {
        return this.httpClient.put<any>(`${this.endPoint}/${id}/estudio-biblico-cursos`, data);
    }

}

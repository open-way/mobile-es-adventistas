import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EstudioBiblicoCursosService {

    public endPoint = 'estudio-biblico-cursos';

    constructor(private httpClient: HttpClient) { }

    public add$(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.endPoint}`, data);
    }

    public update$(id, data: any): Observable<any> {
        return this.httpClient.put<any>(`${this.endPoint}/${id}`, data);
    }
}

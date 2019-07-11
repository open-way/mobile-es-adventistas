import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VisitaMisionerasService {

    public endPoint = 'visita-misioneras';

    constructor(private httpClient: HttpClient) { }

    public getAllByPastor$(query: any): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/by-pastor`, { params: query });
    }

    public add$(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.endPoint}/by-pastor`, data);
    }

    public delete$(id: any): Observable<any> {
        return this.httpClient.delete<any>(`${this.endPoint}/${id}`);
    }

}

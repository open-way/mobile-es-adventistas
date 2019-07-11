import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LeccionesService {
    private endPoint = 'leccions';
    constructor(private httpClient: HttpClient) { }

    public getAll$(): Observable<any> {
        return this.httpClient.get<any>(this.endPoint);
    }

    public getByQuery$(query: any): Observable<any> {
        return this.httpClient.get<any>(this.endPoint, { params: query });
    }
}

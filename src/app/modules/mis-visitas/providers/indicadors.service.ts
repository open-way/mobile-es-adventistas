import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IndicadorsService {
    private endPoint = 'indicadors';
    constructor(private httpClient: HttpClient) { }

    public getAll$(): Observable<any> {
        return this.httpClient.get<any>(this.endPoint);
    }
}

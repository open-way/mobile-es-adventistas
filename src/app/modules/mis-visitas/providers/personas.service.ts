import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PersonasService {
    private endPoint = 'personas';
    constructor(private httpClient: HttpClient) { }

    public getByQuery$(query: any): Observable<any> {
        return this.httpClient.get<any>(this.endPoint, { params: query });
    }

    // public getById$(id: any): Observable<any> {
    //     return this.httpClient.get<any>(`${this.endPoint}/${id}`);
    // }

    // public add$(data: any): Observable<any> {
    //     return this.httpClient.post<any>(this.endPoint, data);
    // }

    // public update$(id: any, data: any): Observable<any> {
    //     return this.httpClient.put<any>(`${this.endPoint}/${id}`, data);
    // }
}

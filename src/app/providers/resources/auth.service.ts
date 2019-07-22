import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Storage } from '@ionic/storage';
import { catchError, map } from 'rxjs/operators';

const TOKEN_KEY = 'es-auth-token';

@Injectable({ providedIn: 'root' })
// @Injectable()
export class AuthService {
    private endPoint = 'auth';
    public authenticationState = new BehaviorSubject(false);

    constructor(
        private httpClient: HttpClient,
        private storage: Storage,
    ) { }

    public login(crendentials): Observable<any> {
        return this.httpClient.post<any>(`${this.endPoint}/login`, crendentials)
            .pipe(
                map(response => {
                    return this.storage.set(TOKEN_KEY, response.access_token).then(() => {
                        this.authenticationState.next(true);
                    });
                }),
                catchError(() => of(null)),
                // catchError(() => of({})),
            );
    }

    public logout() {
        return this.httpClient.get<any>(`${this.endPoint}/logout`)
            .pipe(
                map(response => {
                    return this.storage.remove(TOKEN_KEY).then(() => {
                        this.authenticationState.next(false);
                    });
                }),
                catchError(() => of({})),
            );

    }

    // public isAuthenticated() {
    //     return this.storage.get(TOKEN_KEY);
    // }

    public checkToken() {
        this.storage.get(TOKEN_KEY).then(res => {
            if (res) {
                this.authenticationState.next(true);
            }
        });
    }

    public getToken(): Promise<string> {
        return this.storage.get(TOKEN_KEY);
    }

    public user(): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/user`);
    }

    public enterprise(): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/enterprise`);
    }
}

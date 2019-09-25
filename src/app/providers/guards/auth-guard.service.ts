import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../resources';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

    constructor(public authService: AuthService) { }

    // canActivate(): Promise<any> {
        canActivate(): boolean {
        // return new Promise((resolve, reject) => {
        //     this.authService.getToken().then(token => {
        //         if (token) {
        //             resolve(true);
        //         } else {
        //             resolve(false);
        //         }
        //     }, err => {
        //         reject(false);
        //     });
        // });
        return true
    }
}

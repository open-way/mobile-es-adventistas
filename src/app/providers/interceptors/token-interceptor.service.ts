import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { AuthService } from '../resources';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return from(this.authService.getToken())
      .pipe(switchMap((token: string) => {
        const authorizationReq = token ? this.setAuthHeader(token, req) : req;
        const urlReq = this.setUrl(authorizationReq);
        const handleRequest = next.handle(urlReq);
        return handleRequest;
      }));
  }

  private setAuthHeader(token, req: HttpRequest<any>): HttpRequest<any> {
    const authorization = token;
    const header = req.headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authorization}`);

    const authorizationReq = req.clone({ headers: header });
    return authorizationReq;
  }

  private setUrl(req: HttpRequest<any>): HttpRequest<any> {
    if (!req.url.includes('assets/')) {
      return req.clone({ url: `${environment.apiEsUrl}${req.url}` });
    } else {
      return req.clone({ url: `${req.url}` });
    }
  }
}

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoadingService, ToastService } from '../utils';
// import { ToastrService } from 'ngx-toastr';
// import { EsOAuthStoreService } from 'src/app/oauth/providers';
// import { environment } from '@env/environment';

@Injectable()
export class CatchInterceptorService implements HttpInterceptor {
  // private started;
  // private loading;

  constructor(
    // private router: Router,
    private loadingService: LoadingService,
    private toastService: ToastService,
    // private esOAuthStoreService: EsOAuthStoreService,
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const interceptOperators = tap<HttpEvent<any>>(
      response => this.logResponse(response, req.method),
      err => this.catchError(err),
    );

    /** -----------Spinner loading create---------- */
    if (req.method !== 'GET') {
      this.loadingService.present('Realizando operación.');
    }
    /** ------------------------------------------- */

    const handleRequest = next.handle(req);
    return handleRequest.pipe(interceptOperators);

  }

  private logResponse = (event: HttpEvent<any>, method: string) => {

    if (event instanceof HttpResponse) {
      this.loadingService.dismiss();
      /** -----------Toaster create---------- */
      if (method !== 'GET') {
        // if (event.body.success) {
        this.toastService.show('Operación exitosa!');
        // } else {
        // this.toastService.show(event.body.message);
        // }
      }
      // else {
      // if (!event.body.success) {
      // this.toastService.show(event.body.message);
      // }
      // }
      /** ------------------------------------------- */
      // const elapsed_ms = Date.now() - this.started;
      // console.log(`Solicitud para ${event.url} tomo ${elapsed_ms} ms.`);
    }
  }

  private catchError = (err) => {
    this.loadingService.dismiss();
    if (err instanceof HttpErrorResponse) {
      this.catchHttpError(err);
    } else {
      // console.error(err.error.error.message || '');
      this.toastService.show(err.error.error.message || '');
    }
  }

  private catchHttpError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.toastService.show(err.error.error.message || '');
      this.catchUnauthorized();
    } else {
      this.toastService.show(err.message || '');
      // console.warn(err.statusText);
    }
  }

  private catchUnauthorized() {
    this.navigateToLogin();
  }

  private navigateToLogin() {
    // this.app.getRootNav().setRoot(LoginPage)
  }
}


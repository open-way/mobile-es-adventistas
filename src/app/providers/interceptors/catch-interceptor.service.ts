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
import { LoadingService, ToastService } from '../utils';

@Injectable()
export class CatchInterceptorService implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService,
    private toastService: ToastService,
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const interceptOperators = tap<HttpEvent<any>>(
      response => this.logResponse(response, req.method),
      err => this.catchError(err),
    );

    /** -----------Spinner loading create---------- */
    if (req.method !== 'GET') {
      // this.loadingService.present('Realizando operación.');
    }
    /** ------------------------------------------- */

    const handleRequest = next.handle(req);
    return handleRequest.pipe(interceptOperators);

  }

  private logResponse = (event: HttpEvent<any>, method: string) => {

    if (event instanceof HttpResponse) {
      // this.loadingService.dismiss();
      /** -----------Toaster create---------- */
      if (method !== 'GET') {
        this.toastService.show('Operación exitosa!');
      }
    }
  }

  private catchError = (err) => {
    // this.loadingService.dismiss();
    if (err instanceof HttpErrorResponse) {
      this.catchHttpError(err);
    } else {
      this.toastService.show(err.error.error.message || '');
    }
  }

  private catchHttpError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.toastService.show(err.error.error.message || '');
      this.catchUnauthorized();
    } else {
      this.toastService.show(err.error.error.message || '');
    }
  }

  private catchUnauthorized() {
    this.navigateToLogin();
  }

  private navigateToLogin() {
  }
}


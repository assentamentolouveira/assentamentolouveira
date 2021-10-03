import { PoNotificationService } from '@po-ui/ng-components';
import { LoginService } from './../../core/login/shared/login.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService, private poNotificationService: PoNotificationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.loginService.getToken();
    let authReq
    if (request.url.indexOf('assist') < 0){
      authReq = request.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } })
    } else {
      authReq = request.clone();
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('this is client side error');
          errorMsg = `Error: ${error.error.message}`;
        }
        else {
          if (error.status === 401) {
            this.loginService.realizaLogout();
            this.poNotificationService.error("Usuário não autorizado. Realize o login novamente.")
          }
          console.log('this is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.error.message}`;
        }
        console.log(errorMsg);
        return throwError({ message: errorMsg, status: error.status });
      })
    )
  }
}

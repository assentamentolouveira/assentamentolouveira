import { LoginService } from './../../core/login/shared/login.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.loginService.getToken();
    const authReq = request.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });

    return next.handle(authReq);
  }
}

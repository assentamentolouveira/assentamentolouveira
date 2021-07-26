import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/shared/login.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginService.isLoggedIn()) {
      return true;
    }
    if (this.loginService.isInternet) {
      this.router.navigate(['/internet/login']);
    } else {
      this.router.navigate(['/intranet/login']);
    }
    return false;
  }

  constructor(private loginService: LoginService, private router: Router) {}
}

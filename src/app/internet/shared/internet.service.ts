import { environment } from './../../../environments/environment';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Observable, of } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { login } from 'src/app/core/login/shared/login.model';

@Injectable({
  providedIn: 'root'
})
export class InternetService extends BaseResourceService {
  constructor(protected injector: Injector) {
    super(environment.URL + '/usuario', injector)
  }

  gravaLogin(id:string): Observable<any> {
    return this.http.put(`${this.apiPath}/${id}`, {acessoInicial: false}, this.httpOptions)
  }

  gravaAceite(id:string): Observable<any> {
    return this.http.put(`${this.apiPath}/aceite/${id}`,{}, this.httpOptions)
  }
}

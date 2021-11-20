import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessamentoService extends BaseResourceService {
  constructor(protected injector: Injector) {
    super(environment.URL + '/solicitacaomoradia/pontuacao', injector);
  }

  processaSolicitacoes(salarioMinimo: number): Observable<any> {
    return this.http.post(`${this.apiPath}/processar`, { salarioMinimo: salarioMinimo }, this.httpOptions)
  }

  getProcessamento(): Observable<any> {
    return this.http.get(`${this.apiPath}/situacao`)
  }


}

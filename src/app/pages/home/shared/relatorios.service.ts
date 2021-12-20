import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService extends BaseResourceService {
  constructor(protected injector: Injector) {
    super(environment.URL + '/relatorio/', injector);
  }

  processaSolicitacoes(salarioMinimo: number): Observable<any> {
    return this.http.post(`${this.apiPath}/processar`, { salarioMinimo: salarioMinimo }, this.httpOptions)
  }

  getEtinias(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparEtnia')
  }

  getGenero(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparGenero')
  }

  getRenda(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparFonteRenda')
  }

  getFonteRenda(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparFonteRenda')
  }

  getEscolaridade(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparEscolaridade')
  }

  getTempoMoradiaLouveira(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparTempoMoradiaLouveira')
  }

  getAcessoAbastecimentoAgua(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparAcessoAbastecimentoAgua')
  }

  getAcessoColetadeLixo(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparAcessoColetaLixo')
  }

  getAcessoSaneamentoSanitario(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparAcessoSaneamentoSanitario')
  }

  getCadastroUnicoFamilia(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparCadastroUnicoFamilia')
  }

  getCaracteristicaMoradia(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparCaracteristicaMoradia')
  }

  getMoradiaSofreuDesastre(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparMoradiaSofreuDesastre')
  }

  getPossuiAutomovel(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparPossuiAutomovel')
  }

  getGastoComAluguel(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparGastoComAluguel')
  }

  getExportarTitularExcel(): Observable<any> {
    return this.http.get(this.apiPath + '/ExportarTitularExcel')
  }
}

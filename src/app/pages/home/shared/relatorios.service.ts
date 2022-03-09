import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService extends BaseResourceService {
  constructor(protected injector: Injector) {
    super(environment.URL + '/relatorio', injector);
  }

  processaSolicitacoes(salarioMinimo: number): Observable<any> {
    return this.http.post(`${this.apiPath}/processar`, { salarioMinimo: salarioMinimo }, this.httpOptions)
  }

  getGenero(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparGenero')
  }

  getTotalizadores(): Observable<any> {
    return this.http.get(this.apiPath + '/Totalizador')
  }

  getTotalFamiliasContempladas(): Observable<any> {
    return this.http.get(this.apiPath + '/TotalDeFamiliasContempladas')
  }

  getUsoMoradia(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparUsoMoradia')
  }

  getEtinias(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparEtnia')
  }

  getRenda(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparRenda?salarioMinimo=800')
  }

  getTipoRenda(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparTipoRenda')
  }

  getFamiliaPorNumeroDependente(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparFamiliaPorNumeroDependente')
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

  getAcessoEnergiaEletrica(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparAcessoEnergiaEletrica')
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

  getPessoasComDeficiencia(): Observable<any> {
    return this.http.get(this.apiPath + '/AgruparPessoasComDeficiencia')
  }

  getExportarTitularExcel(): Observable<any> {
    return this.http.get(this.apiPath + '/ExportarListaCadastroExcel', {responseType: 'blob' as 'json'})
  }

  getExportarSMoradiaExcel(): Observable<any> {
    return this.http.get(this.apiPath + '/ExportarSMoradiaExcel', {responseType: 'blob' as 'json'})
  }

  getExportarSMoradiaIdosoExcel(): Observable<any> {
    return this.http.get(this.apiPath + '/ExportarSMoradiaIdosoExcel', {responseType: 'blob' as 'json'})
  }

  getExportarSMoradiaPcdExcel(): Observable<any> {
    return this.http.get(this.apiPath + '/ExportarSMoradiaPcdExcel', {responseType: 'blob' as 'json'})
  }

  //ExportarSMoradiaExcel
  //ExportarSMoradiaIdosoExcel
  //ExportarSMoradiaPcdExcel
}

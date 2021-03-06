import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { BaseResourceService } from "src/app/shared/services/base-resource.service";
import { environment } from "src/environments/environment";
import { Titular } from "../../titulares/shared/titular.model";
import { Moradia } from "./moradia.model";

@Injectable({
  providedIn: 'root',
})

export class MoradiaService extends BaseResourceService {
  constructor(protected injector: Injector) {
    super(environment.URL + '/moradia', injector);
  }

  getMoradiabyTitular(idTitular: string): Observable<Moradia> {
    return this.http.get<Moradia>(`${this.apiPath}/titular/${idTitular}`).pipe(
      tap((res) => {
        res.acessaUnidBasicaSaude = this.converterParaInteiro(res.acessaUnidBasicaSaude);
        res.temAcessoEscolaCreche = this.converterParaInteiro(res.temAcessoEscolaCreche);
        res.desastreMoradia = this.desmontaObjetoDesastresDaMoradia(res.desastreMoradia);
        res.utilizaTransporteEscolar = this.converterParaInteiro(res.utilizaTransporteEscolar);
        res.acessaCras = this.converterParaInteiro(res.acessaCras);
        res.acessaCreas = this.converterParaInteiro(res.acessaCreas);
        res.acessaServConvivenciaCriancaAdolescente = this.converterParaInteiro(res.acessaServConvivenciaCriancaAdolescente);
        res.acessaServConvivenciaCriancaIdoso = this.converterParaInteiro(res.acessaServConvivenciaCriancaIdoso);
        res.caracteristicaMoradia = this.desmontaObjetoCaracterÃ­sticasDaMoradia(res.caracteristicaMoradia);
        return res
      })
    )
  }


  postMoradia(moradia: Moradia): Observable<Moradia> {
    const moradiaTratada = this.trataMoradia(moradia)
    return this.http.post<Moradia>(this.apiPath, moradiaTratada, this.httpOptions).pipe()
  }

  putMoradia(moradia: Moradia, moradiaId: string): Observable<Moradia> {
    const moradiaTratada = this.trataMoradia(moradia)
    // const camposMoradiaPreenchidos:any = moradiaTratada;
    // Object.keys(camposMoradiaPreenchidos).forEach((key) => (camposMoradiaPreenchidos[key] == null) && delete camposMoradiaPreenchidos[key])
    return this.http.put<Moradia>(`${this.apiPath}/${moradiaId}`, moradiaTratada, this.httpOptions).pipe()
  }

  converterParaBoleano(valor: number | boolean): boolean {
    return valor === 1 ? true : false
  }

  converterParaInteiro(valor: number | boolean): number {
    return valor ? 1 : 2
  }

  trataMoradia(moradia: Moradia): Moradia {
    let moradiaTratada = moradia;
    moradia.caracteristicaMoradia = this.montaObjetoCaracterÃ­sticasDaMoradia(moradia.caracteristicaMoradia, moradia.id);
    moradia.desastreMoradia = this.montaObjetoDesastresDaDaMoradia(moradia.desastreMoradia, moradia.id);
    moradia.acessaUnidBasicaSaude = this.converterParaBoleano(moradia.acessaUnidBasicaSaude);
    moradia.temAcessoEscolaCreche = this.converterParaBoleano(moradia.temAcessoEscolaCreche);
    moradia.utilizaTransporteEscolar = this.converterParaBoleano(moradia.utilizaTransporteEscolar);
    moradia.acessaCras = this.converterParaBoleano(moradia.acessaCras);
    moradia.acessaCreas = this.converterParaBoleano(moradia.acessaCreas);
    moradia.acessaServConvivenciaCriancaAdolescente = this.converterParaBoleano(moradia.acessaServConvivenciaCriancaAdolescente);
    moradia.acessaServConvivenciaCriancaIdoso = this.converterParaBoleano(moradia.acessaServConvivenciaCriancaIdoso);
    moradia.titularId = String(sessionStorage.getItem('idTitular'));
    moradia.familiaIncProcHabit = this.converterParaBoleano(moradia.familiaIncProcHabit);
    moradia.possuiImovel = this.converterParaBoleano(moradia.possuiImovel);
    moradia.programaHabitacional = this.converterParaBoleano(moradia.programaHabitacional);
    moradia.regFundOuUsocapiao = this.converterParaBoleano(moradia.regFundOuUsocapiao);
    delete moradia.totalDeDespesasMensais;
    return moradia
  }

  montaObjetoCaracterÃ­sticasDaMoradia(caracterÃ­sticas: object[], moradiaId: string): object[] {
    let objetoCaracteristica: object[] = [];
    caracterÃ­sticas ? caracterÃ­sticas.map(caracteristica => objetoCaracteristica.push({ tipo: caracteristica })) : objetoCaracteristica = [];
    return objetoCaracteristica
  }

  desmontaObjetoCaracterÃ­sticasDaMoradia(caracterÃ­sticas: any[]): object[] {
    let objetoCaracteristica: any[] = [];
    caracterÃ­sticas.map(caracteristica => objetoCaracteristica.push(caracteristica.tipo));
    return objetoCaracteristica
  }

  montaObjetoDesastresDaDaMoradia(desastre: object[], moradiaId: string): object[] {
    let objetoDesastre: object[] = [];
    if (desastre !== undefined) {
      desastre ? desastre.map(desastre => objetoDesastre.push({ tipo: desastre })) : objetoDesastre = [];
    }
    return objetoDesastre
  }

  desmontaObjetoDesastresDaMoradia(desastre: any[]): object[] {
    let objetoDesastre: any[] = [];
    if (desastre !== undefined) {
      desastre.map(desastre => objetoDesastre.push(desastre.tipo));
    }
    return objetoDesastre
  }
}

import { TitularesService } from './../../titulares/shared/titulares.service';
import { Injectable, Injector } from "@angular/core";
import { PoTableColumn } from "@po-ui/ng-components";
import { Observable } from "rxjs";
import { map, mergeMap, switchMap, toArray } from "rxjs/operators";
import { BaseResourceService } from "src/app/shared/services/base-resource.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AssentamentoService extends BaseResourceService {
  constructor(protected injector: Injector, private titularesService: TitularesService) {
    super(environment.URL + '/solicitacaomoradia', injector);
  }

  getAssentamentoPorTitular(idTitular: string | null): Observable<any> {
    return this.http.get<any>(`${this.apiPath}/titular/${idTitular}`).pipe()
  }

  gravaAssentamento(moradiaId: string, titularId: string): Observable<any> {
    const moradia = {
      moradiaID: moradiaId,
      titularId: titularId
    }
    return this.http.post<any>(this.apiPath, moradia, this.httpOptions);
  }

  alteraAssentamento(moradiaId: string, titularId: string, assentamentoId: string): Observable<any> {
    const moradia = {
      moradiaID: moradiaId,
      titularId: titularId
    }
    return this.http.put(`${this.apiPath}/${assentamentoId}`, moradia, this.httpOptions);
  }

  getColumns(): PoTableColumn[] {
    return [
      {
        property: 'idAssentamento',
        label: 'Id Assentamento',
        type: 'string',
        visible: false,
      },
      {
        property: 'numeroCpf',
        label: 'CPF Titular',
        type: 'string',
        visible: false,
      },
      {
        property: 'nome',
        width: '20%',
        label: 'Nome',
        type: 'string',
        visible: true,
      },
      {
        property: 'cpfFormatado',
        width: '20%',
        label: 'CPF Titular',
        type: 'string',
        visible: true,
      },
      {
        property: 'numeroCartaoCidadao',
        label: 'Cartão Cidadão',
        type: 'string',
        visible: true,
      },
      {
        property: 'titularID',
        label: 'ID Titular',
        type: 'string',
        visible: false,
      },
      {
        property: 'pontuacao',
        width: '10%',
        label: 'Pontuação',
        type: 'number',
        visible: true,
      }

    ];
  }



  getAll(pagina: number = 0, filtroRecebido?: string): Observable<any> {
    let filtro: string = '';
    pagina = pagina * 10;
    if (filtroRecebido)
      filtro = `&$filter=contains(Titular/NumeroCpf,'${filtroRecebido}')`

    const queryParams = `&skip=${pagina}` + filtro

    return this.http.get<any>(`${this.httpBusca}solicitacaomoradiaodata?$expand=Titular${queryParams}`)
    .pipe(
      switchMap(titulares => titulares.value),
      mergeMap((titular:any) => {
        return this.titularesService.getDadosCartaoCidadao(titular.Titular.NumeroCpf).pipe(
          map(a => Object.assign(titular, a) )
        );
      })
      , toArray())
  }
}

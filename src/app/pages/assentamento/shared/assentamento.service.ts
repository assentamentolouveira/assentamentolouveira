import { Injectable, Injector } from "@angular/core";
import { PoTableColumn } from "@po-ui/ng-components";
import { Observable } from "rxjs";
import { BaseResourceService } from "src/app/shared/services/base-resource.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AssentamentoService extends BaseResourceService {
  constructor(protected injector: Injector) {
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
        width: '35%',
        label: 'Id Assentamento',
        type: 'string',
        visible: false,
      },
      {
        property: 'numeroCpf',
        width: '35%',
        label: 'CPF Titular',
        type: 'string',
        visible: false,
      },
      {
        property: 'cpfFormatado',
        width: '35%',
        label: 'CPF Titular',
        type: 'string',
        visible: true,
      },
      {
        property: 'numeroCartaoCidadao',
        width: '35%',
        label: 'Cartão Cidadão',
        type: 'string',
        visible: true,
      },
      {
        property: 'titularID',
        width: '35%',
        label: 'ID Titular',
        type: 'string',
        visible: false,
      },
      {
        property: 'pontuacao',
        width: '30%',
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


    return this.http.get(`${this.httpBusca}solicitacaomoradiaodata?$expand=Titular${queryParams}`)
  }
}

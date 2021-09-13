import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
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

  getMoradiabyTitular(idTitular: string): Observable<Moradia>{
    return this.http.get<Moradia>(`${this.apiPath}/${idTitular}`)
  }


  postMoradia(titular: Titular): Observable<Moradia> {
    const moradia = {
      titularId: titular.id,
      caracteristicaMoradia:[{tipo:1}]
    }
    return this.http.post<Moradia>(this.apiPath, moradia, this.httpOptions).pipe()
  }

  putMoradia(moradia: Moradia, titular: Titular): Observable<Moradia> {
    const moradiaTratada = {
      titularId: titular.id,
      caracteristicaMoradia:[{tipo:1}]
    }
    return this.http.put<Moradia>(this.apiPath, moradia, this.httpOptions).pipe()
  }
}

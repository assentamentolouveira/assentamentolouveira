import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Renda } from './renda.model';

@Injectable({
  providedIn: 'root'
})
export class RendasService extends BaseResourceService {
  constructor(protected injector: Injector) {
    super('api/titulares', injector);
  }

  getRendasById(cpf: string = ''): Observable<Renda[]> {
    const teste = [
      { valorRenda: 2500.00, tipoRenda: '1', descricaoRenda: 'Formal' },
      { valorRenda: 750.99, tipoRenda: '2', descricaoRenda: 'Informal' },
      { valorRenda: 1200.34, tipoRenda: '3', descricaoRenda: 'Aposentadoria' },
    ]
    return of(teste).pipe(

    )
  }

}

import { Injectable, Injector } from "@angular/core";
import { BaseResourceService } from "src/app/shared/services/base-resource.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})

export class MoradiaService extends BaseResourceService {
  constructor(protected injector: Injector) {
    super(environment.URL + '/moradia', injector);
  }
}

import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';

import { PoTableColumn } from '@po-ui/ng-components';

import { BaseResourceModel } from '../models/base-resource.model';

export abstract class BaseResourceService {
  protected http: HttpClient;
  protected httpBusca = environment.URLFilter;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accept': '*/*' }),
  };

  constructor(public apiPath: string, protected injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  // abstract getColumns(): Array<PoTableColumn>;
}

import { Router } from '@angular/router';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Assentamento extends BaseResourceModel {
  constructor(public id?: number, public codigo?: string) {
    super();
  }
}

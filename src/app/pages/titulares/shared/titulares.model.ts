import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Titulares extends BaseResourceModel {
  constructor(public id?: number, public nome?: string) {
    super();
  }
}

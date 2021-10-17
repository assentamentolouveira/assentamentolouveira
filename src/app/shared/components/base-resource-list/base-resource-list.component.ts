import { Directive, OnInit } from '@angular/core';
import { PoPageAction, PoTableColumn } from '@po-ui/ng-components';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';
@Directive()
export abstract class BaseResourceListComponent
  // implements OnInit
{
  actions: Array<PoPageAction> = [];
  resources: any[]= [];
  columns: Array<PoTableColumn>;

  constructor(
    readonly title: string,
    protected routerNew: string,
    private resourceService: BaseResourceService
  ) {}

  // ngOnInit(): void {
  //   this.setActions();
  //   this.columns = this.getColumnsResource();
  // }

  setActions(): void {
    this.actions = [
      {
        label: 'Incluir',
        url: this.routerNew,
        icon: "po-icon-plus",
      }
    ];
  }

  protected getColumnsResource(): Array<PoTableColumn> {
    return []//this.resourceService.getColumns();
  }
}

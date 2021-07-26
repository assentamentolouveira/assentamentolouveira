import {
  AfterContentChecked,
  Directive,
  Injector,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel>
  implements OnInit, AfterContentChecked
{
  currentAction: string;
  pageTitle: string;

  protected formBuilder: FormBuilder;
  protected route: ActivatedRoute;
  protected router: Router;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.setCurrentAction();
  }

  ngAfterContentChecked(): void {
    // Carrega depois que todo componente foi iniciado
    this.setPageTitle();
    this.buildResourceForm();
  }

  protected setCurrentAction(): void {
    if (this.route.snapshot.url[0].path === 'novo') {
      this.currentAction = 'novo';
    } else {
      this.currentAction = 'editar';
    }
  }

  protected setPageTitle(): void {
    if (this.currentAction === 'novo') {
      this.pageTitle = this.creationPageTitle();
    } else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string {
    return 'Novo';
  }

  protected editionPageTitle(): string {
    return 'Edição';
  }

  protected abstract buildResourceForm(): void;
}

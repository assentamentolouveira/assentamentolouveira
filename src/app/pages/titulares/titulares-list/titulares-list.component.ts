import { LoginService } from './../../../core/login/shared/login.service';
import { Router } from '@angular/router';
import { Titular } from './../shared/titular.model';
import { debounce, debounceTime, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { TitularesService } from './../shared/titulares.service';
import { AfterContentInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Titulares } from '../shared/titulares.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PoModalAction, PoModalComponent, PoTableAction, PoNotificationService } from '@po-ui/ng-components';
import { TitularBackEnd } from '../shared/titularBackEnd.model';
import { DocumentPipe } from 'src/app/shared/pipes/document.pipe';

@Component({
  selector: 'app-titulares-list',
  templateUrl: './titulares-list.component.html',
  styles: [],
})
export class TitularesListComponent extends BaseResourceListComponent implements OnDestroy {

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  close: PoModalAction = {
    action: () => {
      this.fechaModal();
    },
    label: 'Cancelar',
    danger: true
  };

  confirm: PoModalAction = {
    action: () => {
      this.confirmaCPFInclusao();
    },
    label: 'Confirmar'
  };

  public formularioInclusaoTitular: FormGroup;
  public reactiveForm: FormGroup;
  public disativarShowMore = false;
  public carregandoRegistros = false;
  public acoes: Array<PoTableAction> = [
    {
      icon: 'po-icon-edit',
      label: 'Editar',
      action: this.editarTitular.bind(this)
    },
    {
      icon: 'po-icon-close',
      label: 'Excluir',
      action: this.excluirTitular.bind(this)
    }

  ];

  private subscription: Subscription;
  private pagina = 0

  constructor(private titularesService: TitularesService
    , private fb: FormBuilder
    , private router: Router
    , private loginService: LoginService
    , private poNotificationService: PoNotificationService) {
    super('Cadastro de Titular', 'titulares/novo', titularesService);
    this.columns = this.titularesService.getColumns();
    this.criaFormularioPesquisar();
    this.criaFormularioInclusao();
  }

  ngOnInit(): void {
    this.actions = [
      {
        label: 'Incluir',
        action: () => this.informaCPF(),
        icon: "po-icon-plus",
      },
      {
        label: 'Contemplar Titular',
        url: this.routerNew,
        icon: 'po-icon-home'
      }
    ];

    this.buscaTitulares(this.pagina);
    this.subscription = this.reactiveForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(
      res => {
        this.resources = [];
        this.pagina = 0;
        this.buscaTitulares(0, res.pesquisa.replace(/\D/g, ""))
      }
    )



  }

  informaCPF(): void {
    this.poModal.open()
  }

  criaFormularioPesquisar(): void {
    this.reactiveForm = this.fb.group({
      pesquisa: [''],
    });
  }

  criaFormularioInclusao(): void {
    this.formularioInclusaoTitular = this.fb.group({
      pesquisaCpfInclusao: [''],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  carregarMais(): void {
    this.pagina++
    this.buscaTitulares(this.pagina)
  }

  buscaTitulares(page: number, filtro: string = ''): void {
    this.carregandoRegistros = true;
    this.columns = this.titularesService.getColumns();
    this.titularesService.getAll(page, filtro).pipe(
      finalize(() => this.carregandoRegistros = false)
    ).subscribe(
      res => {
        if (res.value.length > 0) {
          const pipeCPF = new DocumentPipe();
          this.disativarShowMore = false;
          this.resources = this.resources.concat(
            res.value.map((titular: TitularBackEnd) => {
              return {
                ...titular, cpfFormatado: pipeCPF.transform(titular.NumeroCpf)
              }
            })
          );

        } else {
          this.disativarShowMore = true;
        }
        console.log(res)
      }
    )
  }

  editarTitular(titular: TitularBackEnd): void {
    this.carregandoRegistros = true;
    this.titularesService.getDadosCartaoCidadao(titular.NumeroCpf).subscribe(res => {
      this.titularesService.gravaDadosTitularCartaoCidadao(res);
      this.titularesService.getTitularByCPF(titular.NumeroCpf).subscribe(res => {
        this.titularesService.setTitularInfo(res)
        this.router.navigate([`/intranet/titulares/${titular.NumeroCpf}/editar`]);
      }
        , error => {
          this.poNotificationService.error(error.message)
          this.carregandoRegistros = true
        })
    }
      , error => {
        this.poNotificationService.error(error.message)
        this.carregandoRegistros = true
      })
  }

  excluirTitular(): void {

  }

  fechaModal() {
    this.poModal.close();
    this.formularioInclusaoTitular.reset();
  }

  confirmaCPFInclusao(): void {
    this.titularesService.getTitularByCPF(this.formularioInclusaoTitular.value.pesquisaCpfInclusao).subscribe(
      res => this.poNotificationService.error("Titular já cadastrado")
      , error => {
        this.titularesService.getDadosCartaoCidadao(this.formularioInclusaoTitular.value.pesquisaCpfInclusao).subscribe(
          res => {
            this.titularesService.gravaDadosTitularCartaoCidadao(res);
            this.titularesService.setTitularInfo();
            this.router.navigate([`/intranet/titulares/novo`]);
          }
          , error => this.poNotificationService.error(error.message))
      }
    )
  }


}

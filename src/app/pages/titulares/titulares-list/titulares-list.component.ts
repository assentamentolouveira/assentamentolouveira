import { NewUserService } from './../../../core/login/shared/newUser.service';
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
import { PoModalAction, PoModalComponent, PoTableAction, PoNotificationService, PoDialogService, PoSelectOption } from '@po-ui/ng-components';
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
      if (this.incluiTitular) {
        this.confirmaCPFInclusao();
      }
      if (this.contemplaTitular) {
        this.confimaContempacao();
      }
    },
    label: 'Confirmar'
  };

  public incluiTitular = false;
  public contemplaTitular = false;
  public tituloModal = "";

  public formularioInclusaoTitular: FormGroup;
  public formularioContemplacao: FormGroup;
  public reactiveForm: FormGroup;
  public disativarShowMore = false;
  public carregandoRegistros = false;
  public moradiasContemplacaoOpcoes: PoSelectOption[] = [
    {
      label: 'Loteamento Popular I - Parque Brasil',
      value: 'Loteamento Popular I - Parque Brasil'
    },
    {
      label: 'Loteamento Popular II - Parque dos Estados',
      value: 'Loteamento Popular II - Parque dos Estados'
    },
    {
      label: 'Conjunto Habitacional III - Popular III (Vassoural)',
      value: 'Conjunto Habitacional III - Popular III (Vassoural)'
    },
    {
      label: 'Conjunto Habitacional Popular IV - Popular IV (Mirante do Santo Antônio)',
      value: 'Conjunto Habitacional Popular IV - Popular IV (Mirante do Santo Antônio)'
    },
    {
      label: 'Conjunto Habitacional Sagrado Coração de Jesus (CDHU) - C.H.S.C. Jesus',
      value: 'Conjunto Habitacional Sagrado Coração de Jesus (CDHU) - C.H.S.C. Jesus'
    },
    {
      label: 'Conjunto Habitacional Louveira D Brasil (CDHU)',
      value: 'Conjunto Habitacional Louveira D Brasil (CDHU)'
    },
    {
      label: 'Residencial Parque dos Estados',
      value: 'Residencial Parque dos Estados'
    }

  ];
  public acoes: Array<PoTableAction> = [
    {
      icon: 'po-icon-edit',
      label: 'Editar',
      action: this.editarTitular.bind(this)
    },
    {
      icon: 'po-icon-warehouse',
      label: 'Contemplar',
      action: this.contemplarTitular.bind(this)
    },
    {
      icon: 'po-icon-close',
      label: 'Excluir',
      action: this.excluirTitular.bind(this)
    },
    {
      icon: 'po-icon-lock',
      label: 'Zerar Senha',
      action: this.alterarSenha.bind(this)
    }

  ];

  public valorPesquisado = ''

  private subscription: Subscription;
  private pagina = 0;
  private cpfSelecionado = '';


  constructor(private titularesService: TitularesService
    , private fb: FormBuilder
    , private router: Router
    , private loginService: LoginService
    , private newUserSetvice: NewUserService
    , private poAlert: PoDialogService
    , private poNotificationService: PoNotificationService) {
    super('Cadastro de Titular', 'titulares/novo', titularesService);
    this.columns = this.titularesService.getColumns();
    this.criaFormularioPesquisar();
    this.criaFormularioInclusao();
    this.criaFormularioContemplacao();
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

    // this.buscaTitulares(this.pagina);
    this.subscription = this.reactiveForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(
      res => {
        this.resources = [];
        this.pagina = 0;
        this.valorPesquisado = res.pesquisa
        if (this.valorPesquisado.length > 0)
          this.buscaTitulares(0, this.valorPesquisado.replace(/\D/g, ""))
      }
    )
  }

  informaCPF(): void {
    this.tituloModal = "Inclusão de Titular";
    this.incluiTitular = true;
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

  criaFormularioContemplacao(): void {
    this.formularioContemplacao = this.fb.group({
      moradiaContemplacao: [''],
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  carregarMais(): void {
    this.pagina++
    this.buscaTitulares(this.pagina, this.valorPesquisado)
  }

  buscaTitulares(page: number, filtro: string = ''): void {
    this.carregandoRegistros = true;
    this.columns = this.titularesService.getColumns();
    this.titularesService.getAll(page, filtro).pipe(
      finalize(() => this.carregandoRegistros = false)
    ).subscribe(
      res => {
        console.log(res)
        if (res.length > 0) {
          const pipeCPF = new DocumentPipe();
          this.disativarShowMore = false;
          this.resources = this.resources.concat(
            res.map((titular: TitularBackEnd) => {
              return {
                ...titular, cpfFormatado: pipeCPF.transform(titular.NumeroCpf), contempladoTratado: titular.Contemplado ? '1' : '2', localContempladoTratado: 'Não definido'
              }
            })
          );

        } else {
          this.disativarShowMore = true;
        }
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
    this.formularioContemplacao.reset();
    this.incluiTitular = false;
    this.contemplaTitular = false;
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

  alterarSenha(titular: TitularBackEnd): void {
    this.poAlert.confirm({
      literals: { confirm: 'Confirmar', cancel: 'Cancelar' },
      title: 'Redefinição de Senha',
      message: "Confirmar resetar a senha do usuário? Ao confirmar, a senha do titular será alterada pera o número do CPF.",
      confirm: () => (this.resetaSenha(titular)),
      cancel: () => ('')
    });
  }

  resetaSenha(titular: TitularBackEnd): void {
    this.newUserSetvice.resetarSenha(titular).subscribe(
      res => { this.poNotificationService.success("Senha alterada com sucesso!") },
      error => { this.poNotificationService.error(error.message) }
    )
  }

  contemplarTitular(titular: TitularBackEnd): void {
    this.contemplaTitular = true;
    this.tituloModal = "Contemplação de Titular";
    this.cpfSelecionado = titular.NumeroCpf;
    this.poModal.open();
  }

  confimaContempacao(): void {
    const bairroContemplacao = this.formularioContemplacao.value.moradiaContemplacao;
    if (bairroContemplacao == "") {
      this.poNotificationService.error("Informe um local para a contemplação");
      return
    }
    this.titularesService.contemplaTitular(this.cpfSelecionado, bairroContemplacao).subscribe(
      res => { this.poNotificationService.success("Usuário Contemplado com Sucesso"); this.poModal.close() },
      error => { this.poNotificationService.error("Erro ao contemplar Titular") }
    );
  }
}

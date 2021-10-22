import { NewUserService } from './../../../core/login/shared/newUser.service';
import { newUser } from './../../../core/login/shared/newUser.model';
import { OpcoesComboService } from 'src/app/shared/services/opcoes-combo.service';
import { token } from './../../../core/login/shared/token.model';
import { ConfiguracoesService } from './../shared/configuracoes.service';
import { AfterContentInit, Component, Injector, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { debounceTime, finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PoModalAction, PoModalComponent, PoTableAction, PoNotificationService, PoDialogService } from '@po-ui/ng-components';
import { tokenBackEnd } from 'src/app/core/login/shared/tokenBackend.model';
import { DocumentPipe } from 'src/app/shared/pipes/document.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes-list.component.html',
  styleUrls: ['./configuracoes-list.component.css']
})
export class ConfiguracoesListComponent extends BaseResourceListComponent implements AfterContentInit, OnDestroy {

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
      this.confirmaManutencao();
    },
    label: 'Confirmar'
  };

  private pagina = 0
  private subscription: Subscription;

  public formularioUsuario: FormGroup;
  public carregandoRegistros = false;
  public disativarShowMore = false;
  public reactiveForm: FormGroup;
  public carregando = false;
  public inclusaoDeUsuario = false;
  public abreModal = false;
  public acoes: Array<PoTableAction> = [
    // {
    //   icon: 'po-icon-edit',
    //   label: 'Editar',
    //   action: this.editarUsuario.bind(this)
    // },
    {
      icon: 'po-icon-close',
      label: 'Excluir',
      action: this.confirmaExclusao.bind(this)
    }

  ];

  constructor(
    protected configuracoesService: ConfiguracoesService,
    protected injector: Injector,
    private fb: FormBuilder,
    private opcoesComboService: OpcoesComboService,
    private poNotificationService: PoNotificationService,
    private newUserService: NewUserService,
    private poAlert: PoDialogService
  ) {
    super('Cadastro de Usuários', 'usuario/novo', configuracoesService);
    this.criaFormularioPesquisar()
  }


  ngOnInit(): void {
    this.actions = [
      {
        label: 'Incluir Usuário',
        action: () => this.abreModalInclusaoDeUsuario(),
        icon: "po-icon-plus",
      }
    ];

    this.subscription = this.reactiveForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(
      res => {
        this.resources = [];
        this.pagina = 0;
        this.buscaUsuarios(0, res.pesquisa.replace(/\D/g, ""))
      }
    )

  }

  abreModalInclusaoDeUsuario(): void {
    this.inclusaoDeUsuario = true;
    this.abreModal = true;
    this.poModal.open();
  }

  ngAfterContentInit(): void {
    this.buscaUsuarios(this.pagina);
  }

  buscaUsuarios(page: number, filtro: string = ''): void {
    this.carregandoRegistros = true;
    if(page === 0)
      this.resources = [];
    this.columns = this.configuracoesService.getColumns();
    this.configuracoesService.getAll(page, filtro).pipe(
      finalize(() => this.carregandoRegistros = false)
    ).subscribe(
      res => {
        if (res.value.length > 0) {
          const pipeCPF = new DocumentPipe();

          this.disativarShowMore = false;
          this.resources = this.resources.concat(
            res.value.map((usuario: tokenBackEnd) => {
              return {
                ...usuario,
                PerfilAcessoTratado: this.opcoesComboService.retornaLabelOpcoes(usuario.PerfilAcesso, this.opcoesComboService.perfilDeAcessoOpcoes),
                IdUsuarioTratado: pipeCPF.transform(usuario.IdUsuario)
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

  carregarMais(): void {
    this.pagina++
    this.buscaUsuarios(this.pagina)
  }

  criaFormularioPesquisar(): void {
    this.reactiveForm = this.fb.group({
      pesquisa: [''],
    });
  }

  editarUsuario(): void {
    this.inclusaoDeUsuario = false;
    this.poModal.open()
  }

  confirmaExclusao(usuario: any): void {
    console.log(usuario)
    this.poAlert.confirm({
      literals: { cancel: "Cancelar", confirm: "Confirmar" },
      title: "Confirmação de Exclusão",
      message: "Deseja realmente excluir o usuário selecionado?",
      confirm: () => this.excluirUsuario(String(usuario.IdUsuario))
    });
  }

  excluirUsuario(id: string): void {
    this.carregando = true;
    this.newUserService.excluiUsuario(id).pipe(
      finalize(() => this.carregando = false)
    ).subscribe(
      res => {
        this.poModal.close();
        this.poNotificationService.success("Usuário excluído com sucesso");
        this.buscaUsuarios(0);
      }
      , erro => console.log(erro)
    )
  }

  fechaModal(): void {
    this.inclusaoDeUsuario = false;
    this.abreModal = false;
    this.poModal.close();
  }

  confirmaManutencao(): void {
    const formularioValido = this.formularioUsuario.valid;
    const informacoesFormulario = this.formularioUsuario.value
    if (!this.formularioUsuario || !formularioValido) {
      this.poNotificationService.warning("Informe Todos os Campos")
    } else {
      informacoesFormulario.novaSenha = informacoesFormulario.novaSenha === '1' ? true : false;
      this.inclusaoDeUsuario ? this.incluirUsuario(informacoesFormulario) : this.alterarUsuario();
    }
  }

  incluirUsuario(formularioUsuario: newUser): void {
    this.carregando = true;
    this.newUserService.criarUsuario(formularioUsuario).pipe(
      finalize(() => this.carregando = false)
    ).subscribe(res => {
      this.poNotificationService.success("Usuário Criado Com Sucesso");
      this.fechaModal();
      this.buscaUsuarios(0);
    }
      , erro => this.poNotificationService.error("Ocorreu um erro na criação do usuário: " + erro.message))
  }

  alterarUsuario(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  recebeFormularioUsuario(formularioUsuario: FormGroup): void {
    this.formularioUsuario = formularioUsuario;
  }
}

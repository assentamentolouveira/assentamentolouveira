import { RelatoriosService } from './../../home/shared/relatorios.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { Assentamento } from './../shared/assentamento.model';
import { AssentamentoService } from './../shared/assentamento.service';
import { Component } from '@angular/core';

import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Titulares } from '../../titulares/shared/titulares.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, finalize } from 'rxjs/operators';
import { DocumentPipe } from 'src/app/shared/pipes/document.pipe';

@Component({
  selector: 'app-assentamento-list',
  templateUrl: './assentamento-list.component.html',
  styleUrls: ['./assentamento-list.component.css']
})
export class AssentamentoListComponent extends BaseResourceListComponent {
  constructor(protected assentamentoService: AssentamentoService, private fb: FormBuilder, private poNotificationService: PoNotificationService, private relatoriosService: RelatoriosService) {
    super('Consulta de Cadastrados', 'assentamento/novo', assentamentoService);
    this.columns = this.assentamentoService.getColumns();
    this.criaFormularioPesquisar();
  }

  private subscription: Subscription;
  private pagina = 0;

  public reactiveForm: FormGroup;
  public valorPesquisado = '';
  public carregandoRegistros = false;
  public disativarShowMore = false;



  ngOnInit() {
    this.actions = [
      {
        label: 'Imprimir Listagem',
        action: () => this.imprimirListagem(),
        icon: "po-icon-plus",
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
          this.buscaAssentamento(0, this.valorPesquisado.replace(/\D/g, ""))
      }
    )
  }

  buscaAssentamento(page: number, filtro: string = '') {
    this.carregandoRegistros = true;
    this.columns = this.assentamentoService.getColumns();
    this.assentamentoService.getAll(page, filtro).pipe(
      finalize(() => this.carregandoRegistros = false)
    ).subscribe(
      res => {
        if (res.length > 0) {
          let resourceTratado: any[] = [];

          const pipeCPF = new DocumentPipe();
          res.map((assentamento: any) => {
            resourceTratado.push({
              idAssentamento: assentamento.Id,
              pontuacao: assentamento.Pontuacao,
              titularID: assentamento.Titular.Id,
              numeroCartaoCidadao: assentamento.Titular.NumeroCartaoCidadao,
              numeroCpf: assentamento.Titular.NumeroCpf,
              nome: assentamento.Nome,
              cpfFormatado: pipeCPF.transform(assentamento.Titular.NumeroCpf)
            })
          })
          this.resources = this.resources.concat(resourceTratado);
          this.disativarShowMore = false;
        } else {
          this.disativarShowMore = true;
        }
      }
    )
  }

  carregarMais(): void {
    this.pagina++
    this.buscaAssentamento(this.pagina, this.valorPesquisado)
  }

  criaFormularioPesquisar(): void {
    this.reactiveForm = this.fb.group({
      pesquisa: [''],
    });
  }

  imprimirListagem(): void {
    this.poNotificationService.success("Gerando Relatórios...")
    this.relatoriosService.getExportarSMoradiaExcel().subscribe(res => {
      this.downloadFile(res, "Lista_Geral")
    },
      error => console.log('Erro ao gerar o relatório.'))

    this.relatoriosService.getExportarSMoradiaIdosoExcel().subscribe(res => {
      this.downloadFile(res, "Lista_Idosos")
    },
      error => console.log('Erro ao gerar o relatório.'))

    this.relatoriosService.getExportarSMoradiaPcdExcel().subscribe(res => {
      this.downloadFile(res, "Lista_PCD")
    },
      error => console.log('Erro ao gerar o relatório.'))
  }


  downloadFile(data: any, nomeDoArquivo:string) {
    // const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // const url = window.URL.createObjectURL(blob);
    // const file = new File([blob], "filename")
    // window.open(url, "_blank");

    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    let a = document.createElement("a")
    let blobURL = URL.createObjectURL(blob)
    a.download = `${nomeDoArquivo}.xlsx`
    a.href = blobURL
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}

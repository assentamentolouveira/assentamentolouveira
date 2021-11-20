import { Subscription } from 'rxjs';
import { Assentamento } from './../shared/assentamento.model';
import { AssentamentoService } from './../shared/assentamento.service';
import { Component } from '@angular/core';

import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Titulares } from '../../titulares/shared/titulares.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-assentamento-list',
  templateUrl: './assentamento-list.component.html',
  styleUrls: ['./assentamento-list.component.css']
})
export class AssentamentoListComponent extends BaseResourceListComponent {
  constructor(protected assentamentoService: AssentamentoService, private fb: FormBuilder) {
    super('Cadastro de Assentamento', 'assentamento/novo', assentamentoService);
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
        if (res.value.length > 0) {
          let resourceTratado: any[] = [];

          res.value.map((assentamento: any) => {
            resourceTratado.push({
                idAssentamento: assentamento.Id,
                pontuacao: assentamento.Pontuacao,
                titularID: assentamento.Titular.Id,
                numeroCartaoCidadao: assentamento.Titular.NumeroCartaoCidadao,
                numeroCpf: assentamento.Titular.NumeroCpf
              })
          })
          this.resources = this.resources.concat(resourceTratado);

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
}

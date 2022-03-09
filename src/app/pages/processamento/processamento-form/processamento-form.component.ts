import { RelatoriosService } from './../../home/shared/relatorios.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { finalize } from 'rxjs/operators';
import { ProcessamentoService } from './../shared/processamento.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-processamento-form',
  templateUrl: './processamento-form.component.html',
  styleUrls: ['./processamento-form.component.css']
})
export class ProcessamentoFormComponent extends BaseResourceListComponent implements OnInit {

  public termoDeAceiteInformado = false;
  public salarioMinimoInformado = false;
  public emProcesso = true;
  public carregando = true;

  private salarioInformado = 0;
  private idInterval: any;

  formularioProcessamento = new FormGroup({
    criteriosDeAceite: new FormControl('Esta rotina irá processar todos os cadastros de títulares ainda não contemplados. Uma vez executada, os dados antigos serão resetados e não poderão ser consultados porteriormente.'),
    checkCriterioDeAceite: new FormControl(false),
    salarioMinimo: new FormControl(0),
  });

  constructor(
    private processamentoService: ProcessamentoService,
    private poNotificationService: PoNotificationService,
    private relatoriosService: RelatoriosService) {
    super('Processamento de Pontuação', '', processamentoService);
  }

  ngOnInit(): void {
    this.actions = [
      {
        label: 'Imprimir Listagem',
        action: () => this.imprimirListagem(),
        icon: "po-icon-plus",
      }
    ];
    this.processamentoService.getProcessamento().pipe(
      finalize(() => this.carregando = true)
    ).subscribe(
      res => {
        if (res.message === "Não existe processamento de pontuação em andamento...") {
          this.emProcesso = false;
        } else {
          this.consultaStatus()
        }
        console.log(res)
      }
    )
  }

  confirmaTermoDeAceite(check: boolean) {
    this.termoDeAceiteInformado = check;
  }

  alteraSalarioMinimo(salario: any) {
    salario = salario.replaceAll('.', '')
    this.salarioInformado = Number(salario.replace(",", "."));
    this.salarioMinimoInformado = this.salarioInformado > 0
  }

  confirmaProcessamento(): void {
    this.processamentoService.processaSolicitacoes(this.salarioInformado).subscribe(
      res => {
        this.poNotificationService.success("Processamento Iniciado");
        this.consultaStatus();
        this.emProcesso = true;
      }
      , error => { this.poNotificationService.error(error.message) }
    )
  }

  consultaStatus(): void {
    if (!this.idInterval) {
      this.idInterval = setInterval(() => {
        this.processamentoService.getProcessamento().pipe(
          finalize(() => this.carregando = true)
        ).subscribe(
          res => {
            if (res.message === "Não existe processamento de pontuação em andamento...") {
              this.poNotificationService.success("Cálculo Finalizado com Sucesso");
              clearInterval(this.idInterval);
              this.emProcesso = false;
            }
            console.log(res)
          }
        )
      }, 20000)
    }
  }

  imprimirListagem(): void {
    //ExportarSMoradiaExcel
    //ExportarSMoradiaIdosoExcel
    //ExportarSMoradiaPcdExcel
    this.poNotificationService.success("Gerando Relatórios...")
    this.relatoriosService.getExportarSMoradiaExcel().subscribe(res => {
      this.downloadFile(res)
    },
      error => console.log('Erro ao gerar o relatório.'))

    this.relatoriosService.getExportarSMoradiaIdosoExcel().subscribe(res => {
      this.downloadFile(res)
    },
      error => console.log('Erro ao gerar o relatório.'))

    this.relatoriosService.getExportarSMoradiaPcdExcel().subscribe(res => {
      this.downloadFile(res)
    },
      error => console.log('Erro ao gerar o relatório.'))
  }


  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, "_blank");
  }
}

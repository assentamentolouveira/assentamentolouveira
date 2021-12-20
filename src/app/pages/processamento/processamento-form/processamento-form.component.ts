import { PoNotificationService } from '@po-ui/ng-components';
import { finalize } from 'rxjs/operators';
import { ProcessamentoService } from './../shared/processamento.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-processamento-form',
  templateUrl: './processamento-form.component.html',
  styleUrls: ['./processamento-form.component.css']
})
export class ProcessamentoFormComponent implements OnInit {

  public termoDeAceiteInformado = false;
  public salarioMinimoInformado = false;
  public emProcesso = true;
  public carregando = true;

  private salarioInformado = 0;
  private idInterval: any;

  formularioProcessamento = new FormGroup({
    criteriosDeAceite: new FormControl('Esta rotina irá processarr todos os cadastros títulares ainda não contemplados. Uma vez executada, os dados antigos serão resetados e não poderão ser consultados porteriormente.'),
    checkCriterioDeAceite: new FormControl(false),
    salarioMinimo: new FormControl(0),
  });

  constructor(private processamentoService: ProcessamentoService, private poNotificationService: PoNotificationService) { }

  ngOnInit(): void {
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
    salario = salario.replaceAll('.','')
    this.salarioInformado = Number(salario.replace(",","."));
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

}

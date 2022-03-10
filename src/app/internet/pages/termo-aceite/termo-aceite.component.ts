import { TitularesService } from './../../../pages/titulares/shared/titulares.service';
import { LoginService } from './../../../core/login/shared/login.service';
import { InternetService } from './../../shared/internet.service';
import { Router } from '@angular/router';
import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PoModalAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-termo-aceite',
  templateUrl: './termo-aceite.component.html',
  styleUrls: ['./termo-aceite.component.css'],
})
export class TermoAceiteComponent implements OnInit {
  @ViewChild('modal') modal: PoModalComponent;

  teste =
  `
   ■ Poderão se cadastrar no SIMHAB pessoas comprovadamente domiciliadas e
   residentes no município de Louveira, que não sejam proprietárias ou
   possuidoras de direitos a qualquer título de outro imóvel em todo o território
   nacional;

   ■ Ser maior de 18 anos e possuir capacidade plena para a prática de todos os atos
   da vida civil;

   ■ As informações prestadas pelo munícipe, sejam através do cadastro online ou
   cadastro oriundo de visita técnica social, deverão ser VERÍDICAS E
   COMPROVADAS através de documentação a ser apresentada para a FUMHAB,
   no momento do cadastro e ratificadas no momento da contemplação da
   unidade habitacional, por meio de processo de investigação social;

   ■ INFORMAÇÕES FALSAS ACARRETARÃO A DESCLASSIFICAÇÃO DO INTERESSADO
   E DE SEU NÚCLEO FAMILIAR;

   ■ O Sistema ficará aberto permanentemente podendo o interessado atualizar o
   cadastro a qualquer momento e é de responsabilidade do munícipe manter o
   cadastro atualizado junto ao SIMHAB;

   ■ Em caso de mudança de município, fica o interessado responsável por informar
   à FUMHAB e solicitar a exclusão do cadastro;

   ■ O cadastro no SIMHAB não garante o direito a uma unidade habitacional;

   ■ É de inteira responsabilidade do munícipe a veracidade pelas informações
   prestadas;

   ■ O munícipe desde já autoriza a utilização pela FUMHAB das informações ora
   prestadas, com a finalidade exclusiva de planejamento e oferta de programas
   habitacionais de interesse social;

   ■ A FUMHAB se responsabiliza pelo sigilo das informações ora prestadas.';`

   FormularioTermosDeAceite = new FormGroup({
    criteriosDeAceite: new FormControl(this.teste),
    checkCriterioDeAceite: new FormControl(false),
  });

  confirm: PoModalAction = {
    action: () => {
      this.validaConfirmacao();
    },
    label: 'Confirmar'
  };

  constructor(private formBuilder: FormBuilder,
    private poNotificationService: PoNotificationService,
    private router: Router,
    private internetService: InternetService,
    private titularesService: TitularesService,
    private loginService: LoginService) { }

  ngOnInit() {
    setTimeout(() => this.primeiroLogin(), 1000);

    // this.FormularioTermosDeAceite.patchValue({ criteriosDeAceite: 'teste' });
    // console.log(this.FormularioTermosDeAceite)
  }

  primeiroLogin(): void {
    if (this.loginService.getAcessoInicial()) {
      this.modal.open();
    } else {
      this.titularesService.getTitularByCPF(this.loginService.getCPFUsuario()).subscribe((res) => {
        this.titularesService.setTitularInfo(res)
        this.router.navigate([`/internet/${this.loginService.getCPFUsuario()}/editar`]);
      },
        (res) => {
          this.titularesService.setTitularInfo();
          this.router.navigate([`/internet/${this.loginService.getCPFUsuario()}/`]);
        })
    }
  }

  validaConfirmacao() {
    if (this.FormularioTermosDeAceite.value.checkCriterioDeAceite) {
      this.internetService.gravaAceite(this.loginService.getCPFUsuario()).subscribe(() => {
        this.modal.close();
        this.titularesService.setTitularInfo();
        this.router.navigate([`/internet/${this.loginService.getCPFUsuario()}`]);
      },
        error => this.poNotificationService.error('Erro ao atualizar o usuário: ' + error.statusText));
    } else {
      this.poNotificationService.error("Aceite os termos para continuar")
    }
  }
}

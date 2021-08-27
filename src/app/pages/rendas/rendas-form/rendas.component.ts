import { OpcoesComboService } from 'src/app/shared/services/opcoes-combo.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoSelectOption } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rendas',
  templateUrl: './rendas.component.html',
  styleUrls: ['./rendas.component.css']
})
export class RendasComponent implements OnInit, OnDestroy {
  public formularioRendas: FormGroup;
  public rendaOpcoes: Array<PoSelectOption>;
  private subscription: Subscription;

  @Input() valorRenda:number;
  @Input() tipoRenda:string;

  @Output() atualizaRenda:EventEmitter<any> = new EventEmitter();;

  constructor(private fb: FormBuilder, private opcoesComboService:OpcoesComboService) {
    this.initialize();
  }

  ngOnInit() {
    this.criaFormulario();
    this.subscription = this.formularioRendas.valueChanges.subscribe(
      () => this.formularioRendas.valid? this.atualizaRenda.emit(this.formularioRendas.value) : false
    );
  }

  criaFormulario(): void {
    this.formularioRendas = this.fb.group({
      valorRenda: [this.valorRenda, Validators.compose([Validators.required])],
      tipoRenda: [this.tipoRenda, Validators.compose([Validators.required])],
    });
  }

  initialize(): void {
    this.rendaOpcoes = this.opcoesComboService.rendaOpcoes;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

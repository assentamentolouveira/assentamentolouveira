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
  public reactiveForm: FormGroup;
  public rendaOpcoes: Array<PoSelectOption>;
  private subscription: Subscription;

  @Input() valorRenda:number;
  @Input() tipoRenda:string;

  @Output() atualizaRenda:EventEmitter<any> = new EventEmitter();;

  constructor(private fb: FormBuilder) {
    this.initialize();
  }

  ngOnInit() {
    this.criaFormulario();
    this.subscription = this.reactiveForm.valueChanges.subscribe(
      () => this.reactiveForm.valid? this.atualizaRenda.emit(this.reactiveForm.value) : false
    );
  }

  criaFormulario(): void {
    this.reactiveForm = this.fb.group({
      valorRenda: [this.valorRenda, Validators.compose([Validators.required])],
      tipoRenda: [this.tipoRenda, Validators.compose([Validators.required])],
    });
  }

  initialize(): void {
    this.rendaOpcoes = [
      {
        value: '1',
        label: 'Formal',
      },
      {
        value: '2',
        label: 'Informal',
      },
      {
        value: '3',
        label: 'Aposentadoria',
      },
      {
        value: '4',
        label: 'Pensão Morte',
      },
      {
        value: '5',
        label: 'Pensão Alimentícia',
      },
      {
        value: '6',
        label: 'BPC',
      }
    ]
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

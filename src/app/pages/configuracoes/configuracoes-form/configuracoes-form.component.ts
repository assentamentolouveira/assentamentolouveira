import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PoComboOption, PoSelectOption } from '@po-ui/ng-components';
import { OpcoesComboService } from 'src/app/shared/services/opcoes-combo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validacoes } from 'src/app/shared/validações/validacoes';
import { newUser } from 'src/app/core/login/shared/newUser.model';
import { tokenBackEnd } from 'src/app/core/login/shared/tokenBackend.model';

@Component({
  selector: 'app-configuracoes-form',
  templateUrl: './configuracoes-form.component.html',
  styleUrls: ['./configuracoes-form.component.css']
})
export class ConfiguracoesFormComponent implements OnInit {

  @Input() edicao = false;
  @Input() usuarioEditado: tokenBackEnd;

  public formularioUsuario: FormGroup;
  public perfilDeAcessoOpcoes: PoSelectOption[];
  public boleanoOpcoes: PoSelectOption[];


  private subscription: Subscription

  @Output() formularioInclusaoDeUsuarioValido: EventEmitter<FormGroup> = new EventEmitter()


  constructor(private fb: FormBuilder, private opcoesComboService: OpcoesComboService) {
    this.perfilDeAcessoOpcoes = this.opcoesComboService.perfilDeAcessoOpcoes;
    this.boleanoOpcoes = this.opcoesComboService.boleanoOpcoes;
    this.montaFormulario();
    this.formularioInclusaoDeUsuarioValido.emit(this.formularioUsuario);
  }

  ngOnInit(): void {
    console.log("usuário Editado:", this.usuarioEditado)
    if (this.edicao)
      this.montaFormularioEdicao(this.usuarioEditado)
  }

  montaFormulario(): void {
    this.formularioUsuario = this.fb.group({
      cpf: ['', Validators.compose([Validators.required, Validacoes.ValidaCpf])],
      nome: ['', Validators.compose([Validators.required])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      acessoInicial: [false],
      funcionario: [true],
      perfilAcesso: ['', Validators.compose([Validators.required])],
      novaSenha: ['1']
    });

    this.subscription = this.formularioUsuario.valueChanges.pipe(
      debounceTime(500)
    )
    .subscribe(res => this.formularioInclusaoDeUsuarioValido.emit(this.formularioUsuario))
  }

  montaFormularioEdicao(usuarioEditado:tokenBackEnd): void {
    this.formularioUsuario.patchValue({
      cpf: usuarioEditado.IdUsuario,
      nome: usuarioEditado.Nome,
      senha: '******',
      acessoInicial: false,
      funcionario: true,
      perfilAcesso: usuarioEditado.PerfilAcesso,
      novaSenha: ['1']
    })
  }

}

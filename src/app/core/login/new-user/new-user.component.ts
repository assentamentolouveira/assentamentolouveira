import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { NewUserService } from './../shared/newUser.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { newUser } from '../shared/newUser.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  public reactiveForm: FormGroup;
  public botaoAtivado: boolean = false;
  constructor(private fb: FormBuilder
    , private newUserService: NewUserService
    , private poNotificationService: PoNotificationService
    , private router: Router) {
    this.criaFormulario();
    this.reactiveForm.valueChanges.subscribe(() => this.botaoAtivado = this.reactiveForm.valid)
  }

  ngOnInit() {
  }

  criaFormulario(): void {
    this.reactiveForm = this.fb.group({
      cpf: [''],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(50)])],
      dataNascimento: ['', Validators.compose([Validators.required])],
      nomePai: ['', Validators.required],
      nomeMae: ['', Validators.required],
    });
  }

  gravaUsuario(): void {
    if (this.reactiveForm.valid) {
      const teste: newUser = this.reactiveForm.value;
      this.newUserService.criarUsuario(teste).subscribe(() => {
        this.poNotificationService.success('Usuário Criado com Sucesso!');
        this.router.navigate(['/internet/login'])
      }
        , erro => this.poNotificationService.error(`Ocorreu um erro ao Criar o usuário: ${erro}`))
    } else {
      this.poNotificationService.warning('Preeencha todos os campos do formulário.')
    }
  }

  voltar(): void {
    this.router.navigate(['/internet/login'])
  }

}
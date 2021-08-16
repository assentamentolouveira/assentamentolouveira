import { SharedModule } from 'src/app/shared/Modulos/shared.module';
import { PoUiComponentsModule } from 'src/app/shared/Modulos/po-ui-components.module';
import { NewUserComponent } from './../new-user/new-user.component';
import { LoginComponent } from 'src/app/core/login/login-form/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [LoginComponent,NewUserComponent],
  imports: [
    CommonModule,
    PoUiComponentsModule,
    SharedModule
  ],
  exports: [LoginComponent,NewUserComponent]
})
export class LoginModule { }

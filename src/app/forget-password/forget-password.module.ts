import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from './forget-password.component';
import { EnterVerificationComponent } from './enter-verification/enter-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmEqualValidatorDirective } from '../shared/Directive/confirm-equal-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ForgetPasswordComponent,
    EnterVerificationComponent,
    ResetPasswordComponent,
    ConfirmEqualValidatorDirective
  ],
  entryComponents: [
    ForgetPasswordComponent,
    EnterVerificationComponent,
    ResetPasswordComponent
  ]
})
export class ForgetPasswordModule { }

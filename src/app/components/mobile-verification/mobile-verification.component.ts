import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WindowService } from '../../shared/service/common/window.service';
import * as firebase from 'firebase';
import { SigninComponent } from '../../signin/signin.component';
import { ResetPasswordComponent } from '../../forget-password/reset-password/reset-password.component';
import { AuthService } from '../../shared/service/common/auth.service';

@Component({
  selector: 'app-mobile-verification',
  templateUrl: './mobile-verification.component.html',
  styleUrls: ['./mobile-verification.component.scss'],
  providers: []
})
export class MobileVerificationComponent implements OnInit {
  windowRef: any;
  userId: number
  phoneNumber: string;

  verificationCode: string;
  constructor(
    private _activeModal: NgbActiveModal,
    private _ngbModal: NgbModal,
    private win: WindowService
  ) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier.render()
  }
  onClickClose() {
    this._activeModal.close('Close Modal');
  }
  onClickBackToLogin() {
    this._activeModal.close('Close Modal');
    this._ngbModal.open(SigninComponent);
  }
  onClickSendCode() {
    swal({
      icon: 'success'
    })
  }
  sendLoginCode() {
    this.getVarifyCode()
  }
  // mobileNumberCheck(mobile) {
  //   const number = {
  //     'Mobile': mobile
  //   }
  //   this._forgetPasswordService.forgetPasswordCheck(number).subscribe(res => {
  //     if (res.Status === 'ok') {
  //       this.userId = res.Data.UserId;
  //       this.getVarifyCode()
  //     } else {
  //       swal({
  //         icon: 'error',
  //         title: res.ResponseMsg
  //       })
  //     }
  //   })
  // }
  getVarifyCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;

    // const num = '+880' + this.phoneNumber;

     const num = '+8801674717699';
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {

        this.windowRef.confirmationResult = result;

      })
      .catch(error => {
        swal({
          icon: 'error',
          title: error.message
        })
      });
    this.windowRef.confirmationResult = true;
  }
  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        this._activeModal.close('Modal Close');
        const modalRef = this._ngbModal.open(ResetPasswordComponent)
        modalRef.componentInstance.userId = this.userId;
      })
      .catch(error => console.log(error, 'Incorrect code entered?'));
  }
}

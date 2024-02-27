
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgetPasswordService } from './../../shared/service/forget-password/forget-password.service';
import { Password } from '../../shared/model/Password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  userId: any;
  password: Password = {
    newPassword: null,
    confimPassword: null
  }
  constructor(
    private _ngbActiveModal: NgbActiveModal,
    private _forgetPasswordService: ForgetPasswordService
  ) { }

  ngOnInit() {
    console.log(this.userId)
  }
  onClickClose() {
    this._ngbActiveModal.close('modal close');
  }
  onClickReset(pass: Password) {
    console.log(pass.newPassword)
    const params = {
      'UserId': this.userId,
      'Password': pass.newPassword
    }
    this._forgetPasswordService.changePassword(params).subscribe(res => {
      console.log(res);
      if (res.Status === 'success') {
        this._ngbActiveModal.close('close modal');
        swal({
          icon: 'success',
          title: res.ResponseMsg
        })
      } else {
        swal({
          icon: 'error',
          title: res.ResponseMsg
        })
      }
    })
  }
}



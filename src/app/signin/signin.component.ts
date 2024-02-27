import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Customer } from '../shared/model/customer.model';
import { CustomerService } from '../shared/service/customer/customer.service';
import { CustomercookiesService } from '../shared/service/common/customercookies.service';
import { AuthService } from '../shared/service/common/auth.service';
import { CustomerGoogle } from '../shared/model/customer-google.model';
import { CustomerFacbook } from '../shared/model/customer-facebook.model';
import { CustomerSocialService } from '../shared/service/common/customer-social.service'
import { SignupComponent } from '../signup/signup.component';
import { SigninHeaderService } from '../shared/service/common/signin-header.service';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { jsonpCallbackContext } from '@angular/common/http/src/module';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  isShow: boolean;
  customer: Customer = {
    UserId: null,
    UserName: null,
    FullName: null,
    Code: null,
    Mobile: null,
    Email: null,
    JoiningDate: null,
    AreaId: null,
    Address1: null,
    Address2: null,
    ProfilePic: null,
    FBId: null,
    GPId: null,
    Password: null,
  }
  constructor(private _ngbActiveModal: NgbActiveModal,
    private _activeModal: NgbActiveModal,
    private _customerService: CustomerService,
    private _cookieService: CookieService,
    private _routes: Router,
    private _customercookiesService: CustomercookiesService,
    private _toastr: ToastrService,
    private _authService: AuthService,
    private _customerSocialService: CustomerSocialService,
    private _ngbModal: NgbModal,
    private _signinHeaderService: SigninHeaderService
  ) { }

  ngOnInit() {
    this._signinHeaderService.isShowCast.subscribe(show => {
      this.isShow = show;
    })
  }
  signInClose(): void {
    this._ngbActiveModal.close('Close Modal');
  }
  signInLeftArrow(): void {
    this._ngbActiveModal.close('Close Modal');
  }
  onClickSignIn(customer: Customer) {
    this.signIn(customer)
  }
  signIn(customer: Customer) {
    this._customerService.customerSignIn(customer).subscribe(cus => {
      if (cus.Status === 'ok') {
        this._ngbActiveModal.close('Close Modal');
        this._customercookiesService.setCustomerCookiesNew(cus);
      } else {
        if (this.customer.FBId != null || this.customer.GPId != null) {
          this._ngbActiveModal.close('Close Modal');
          this._ngbModal.open(SignupComponent);
        } else {
          this._toastr.error(cus.ResponseMsg);
        }
      };
    });
  }
  onClickGoogleLogin() {
    this._authService.doGoogleLogin()
      .then(res => {
        this._routes.navigate(['/home']);
        const customerGoogle: CustomerGoogle = {
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
          id: res.additionalUserInfo.profile.id
        };
        this.customer.GPId = res.additionalUserInfo.profile.id
        this._customerSocialService.setCustomerGoogle(customerGoogle);
        this.signIn(this.customer)
      })
  }
  onClickFacebookLogin() {
    this._authService.doFacebookLogin()
      .then(res => {
        this._routes.navigate(['/home']);
        const customerFacebook: CustomerFacbook = {
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
          id: res.additionalUserInfo.profile.id
        };
        this.customer.FBId = res.additionalUserInfo.profile.id
        this._customerSocialService.setCustomerGoogle(customerFacebook);
        this.signIn(this.customer)
      })
  }
  onClickMobileLogin() {
    alert('mobile verification');
  }
  onClickNewAccount() {
    this._activeModal.close('Close Modal');
    const modalRef = this._ngbModal.open(SignupComponent);
  }
  OnClickForgetPassword() {
    this._activeModal.close('Close Modal');
    this._ngbModal.open(ForgetPasswordComponent);
  }
}



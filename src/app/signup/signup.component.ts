import { Customer } from './../shared/model/customer.model';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { CustomerService } from '../shared/service/customer/customer.service'
import { SigninComponent } from '../signin/signin.component';
import { CustomerSocialService } from '../shared/service/common/customer-social.service';
import { SigninHeaderService } from '../shared/service/common/signin-header.service';
import { MobileVerificationComponent } from './../components/mobile-verification/mobile-verification.component';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
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
    constructor(
        private _ngbModal: NgbModal,
        private modalService: NgbModal,
        private _activeModal: NgbActiveModal,
        private _customerService: CustomerService,
        private _toastrService: ToastrService,
        private _customerGoogleService: CustomerSocialService,
        private _signinHeaderService: SigninHeaderService
    ) { }

    ngOnInit() {
        this.getCustomerGoogle();
    }
    signUpClose(): void {
        this._activeModal.close('Modal Closed');
    }
    signUpLeftArrow(): void {
        this._activeModal.close('Modal Closed');
    }
    onClickSignUp(customer): void {
        const cust: Customer = {
            UserId: customer.UserId,
            UserName: customer.UserName,
            FullName: customer.FullName,
            Code: customer.Code,
            Mobile: customer.Mobile,
            Email: customer.Email,
            JoiningDate: customer.JoiningDate,
            DateOfBirth: customer.DateOfBirth,
            AreaId: customer.AreaId,
            Address1: customer.Address1,
            Address2: customer.Address2,
            ProfilePic: customer.ProfilePic,
            FBId: customer.FBId,
            GPId: customer.GPId,
            Password: customer.Password,
            Gender: customer.Gender
        }
        this._customerService.customerSignUp(cust).subscribe(x => {
            if (x.Status === 'ok') {
                this._activeModal.close('Close Modal');
                this._toastrService.success(x.ResponseMsg)
            } else {
                this._toastrService.error(x.ResponseMsg)
            };
        });
        // this.modalService.open(MobileVerificationComponent);
    }
    onClickSignIn() {
        this._activeModal.close('Close Modal');
    }
    getCustomerGoogle() {
        this._customerGoogleService.customerGoogleCast.subscribe(res => {
            if (res != null) {
                this.customer.FullName = res.displayName;
                this.customer.FBId = res.id;
                this.customer.GPId = res.id;
            }
        })
    }
    onClickSignInLink() {
        this._activeModal.close('Close Modal');
        this._signinHeaderService.setIsShow(true);
        const modalRef = this.modalService.open(SigninComponent);
    }
}

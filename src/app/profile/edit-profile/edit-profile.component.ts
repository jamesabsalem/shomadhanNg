import { ProfileService } from './../../shared/service/profile/profile.service';
import { CustomercookiesService } from './../../shared/service/common/customercookies.service';
import { Customer } from './../../shared/model/customer.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, NgModule } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  private customer: Customer
  constructor(
    private _ngbActiveModal: NgbActiveModal,
    private _customercookiesService: CustomercookiesService,
    private _profileService: ProfileService
  ) { }

  ngOnInit() {
    this.getCustomerInfo();
  }
  onClickClose() {
    this._ngbActiveModal.close('modal close');
  }
  getCustomerInfo() {
    this._customercookiesService.customerInfoCast.subscribe(res => {
      if (res.Status != null && res != null) {
        this.customer = res.Data[0];
      }

      // console.log(this.customer);
    })
  }
  onClickUpdate() {
    const fd = new FormData()

    fd.append('UserId', this.customer.UserId.toString());
    fd.append('FullName', this.customer.FullName);
    fd.append('Mobile', this.customer.Mobile);
    fd.append('Email', this.customer.Email);
    fd.append('Address', this.customer.Address1);
    fd.append('DateOfBirth', this.customer.DateOfBirth);
    fd.append('Gender', this.customer.Gender);

    this._profileService.editProfile(fd).subscribe(res => {
      if (res.Status === 'success') {

        swal({
          icon: 'success',
          title: res.ResponseMsg
        })
        this._customercookiesService.setCustomerCookiesNew(res)
        this._ngbActiveModal.close('modal close');
      }
      console.log(res)
    })
  }
}


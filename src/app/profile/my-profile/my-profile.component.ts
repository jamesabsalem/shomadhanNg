import { PhotoUploadComponent } from './../photo-upload/photo-upload.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Component, OnInit } from '@angular/core';
import { CustomercookiesService } from '../../shared/service/common/customercookies.service';
import { Customer } from '../../shared/model/customer.model'
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  private customer: Customer

  constructor(
    private _customercookiesService: CustomercookiesService,
    private _ngbModal: NgbModal
  ) { }

  ngOnInit() {
    this._customercookiesService.customerInfoCast.subscribe((cust) => {
      if (cust.Status !== 'undefined' && cust.Status !== null) {
        this.customer = cust.Data[0];
      }
    })
  }
  onClickProfilePhoto() {
    this._ngbModal.open(PhotoUploadComponent);
  }
  onClickEdit() {
    this._ngbModal.open(EditProfileComponent);

  }
}

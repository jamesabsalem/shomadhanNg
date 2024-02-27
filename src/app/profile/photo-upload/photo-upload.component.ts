import { CustomercookiesService } from './../../shared/service/common/customercookies.service';
import { ProfileService } from './../../shared/service/profile/profile.service';
import { CustomerInfoService } from './../../shared/service/common/customer-info.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss']
})
export class PhotoUploadComponent implements OnInit {
  // Cropper 1 data
  imageChangedEvent: any = '';
  croppedImage: any = '';
  selectedFile: File = null;




  constructor(
    private _cs: CustomerInfoService,
    private _profileService: ProfileService,
    private _ngbActiveModal: NgbActiveModal,
    private _customerInfoService: CustomerInfoService,
    private _customercookiesService: CustomercookiesService
  ) { }

  ngOnInit() {
  }
  fileChangeEvent(event): void {
    this.imageChangedEvent = event;
    this.selectedFile = event.target.files[0];
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
  }
  onClickImageUpload() {
    const fd = new FormData()
    fd.append('UploadedProfilePictureFile', this.selectedFile, this.selectedFile.name);
    fd.append('UserId', this._customerInfoService.customer.Data[0].UserId);
    fd.append('FullName', this._customerInfoService.customer.Data[0].FullName);
    fd.append('Mobile', this._customerInfoService.customer.Data[0].Mobile);
    fd.append('Email', this._customerInfoService.customer.Data[0].Email);
    fd.append('Address', this._customerInfoService.customer.Data[0].Address1);
    fd.append('DateOfBirth', this._customerInfoService.customer.Data[0].DateOfBirth);
    fd.append('Gender', this._customerInfoService.customer.Data[0].Gender);

    this._profileService.uploadPhoto(fd).subscribe(res => {
      if (res.Status === 'success') {

        swal({
          icon: 'success',
          title: res.ResponseMsg
        })
        this._customercookiesService.setCustomerCookiesNew(res)
        this._ngbActiveModal.close('model close');
      }
    })
  }
  loadImageFailed() {
    // show message
  }
  onClickClose() {
    this._ngbActiveModal.close('close modal');
  }
}

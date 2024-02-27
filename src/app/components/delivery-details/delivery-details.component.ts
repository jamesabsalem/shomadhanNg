import { DeliveryInfo } from './../../models/place-order.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CustomercookiesService } from '../../shared/service/common/customercookies.service';
import { Customer } from '../../shared/model/customer.model';
import { Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit {
  @Input()
  deliveryDetailsData$: Subject<DeliveryInfo>;
  public deliveryDetailsForm: FormGroup;
  customerInfo: Customer;

  constructor(private formBuilder: FormBuilder, private customercookiesService: CustomercookiesService) {
    this.formInit();
    this.deliveryDetailsForm.valueChanges.debounceTime(1000).distinctUntilChanged().subscribe(value => {
      const { name, mobile, oldAddress, newAddress, isOldNewAddress } = value;
      const deliveryInfo: DeliveryInfo = new DeliveryInfo();
      deliveryInfo.DeliveryName = name;
      deliveryInfo.Mobile = mobile;
      deliveryInfo.Address = oldAddress;
      if (isOldNewAddress === 'new') {
        deliveryInfo.Address = newAddress;
      }
      deliveryInfo.Email = this.customerInfo.Email;
      this.deliveryDetailsData$.next(deliveryInfo);
    });
  }

  ngOnInit() {
    this.customerInfo = this.customercookiesService.getCustomerInfo();
    const { FullName: name, Mobile: mobile, Address1: oldAddress } = this.customerInfo;

    this.deliveryDetailsForm.patchValue({ name, mobile, oldAddress, isOldNewAddress: 'old' });
  }

  formInit() {
    this.deliveryDetailsForm = this.formBuilder.group({
      name: '',
      mobile: '',
      oldAddress: '',
      newAddress: '',
      isOldNewAddress: 'old'
    });
  }

  get isOldNewAddress() {
    return this.deliveryDetailsForm.get('isOldNewAddress');
  }

  onNewAddressFocusHandler(event) {
    this.deliveryDetailsForm.get('isOldNewAddress').setValue('new');
  }

  onOldAddressFocusHandler(event) {
    this.deliveryDetailsForm.get('isOldNewAddress').setValue('old');
  }
}

import { CustomercookiesService } from './customercookies.service';
import { CustomerInfo } from './../../model/customer.model';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CustomerInfoService {
  public customer: CustomerInfo;
  constructor(
    private _customercookiesService: CustomercookiesService
  ) {
    this._customercookiesService.customerInfoCast.subscribe(res => {
      this.customer = res;
    })
  }
}

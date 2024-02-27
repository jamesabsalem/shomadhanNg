import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CustomerInfo, Customer } from '../../model/customer.model';
import 'rxjs/add/observable/empty'

@Injectable({
  providedIn: 'root'
})
export class CustomercookiesService {
  private defaultCustomer: CustomerInfo = ({
    Status: null,
    ResponseMsg: null,
    Data: null
  })
  private customerInfo = new BehaviorSubject<CustomerInfo>(this.defaultCustomer)
  public customerInfoCast = this.customerInfo.asObservable();
  constructor(private _cookieService: CookieService) {
  }
  getCustomerCookies() {
    const cookieExists: boolean = this._cookieService.check('customer');
    if (cookieExists) {
      this.customerInfo.next(JSON.parse(this._cookieService.get('customer')));
    }
  }

  setCustomerCookiesNew(customerInfo: CustomerInfo) {
    this._cookieService.delete('customer');
    const cookieExists: boolean = this._cookieService.check('customer');
    if (!cookieExists) {
      this._cookieService.set('customer', JSON.stringify(customerInfo), 7);
      this.customerInfo.next(customerInfo);
    }
  }
  deleteCustomerCookies() {
    this._cookieService.delete('customer');
    this.customerInfo.next(this.defaultCustomer);
  }

  getCustomerInfo() {
    if (this._cookieService.check('customer')) {
      const _customer = JSON.parse(this._cookieService.get('customer'));
      const _customerInfo = _customer.Data[0];
      return _customerInfo as Customer;
    }
    return new Customer();
  }
}

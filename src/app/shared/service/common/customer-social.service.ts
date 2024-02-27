import { Injectable } from '@angular/core';
import { CustomerGoogle } from '../../model/customer-google.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerSocialService {
private defaultCustomerGoogle: CustomerGoogle = {
  displayName: null,
  email: null,
  photoURL: null,
  id: null
}
private customerGoogle = new BehaviorSubject<CustomerGoogle>(this.defaultCustomerGoogle);
public customerGoogleCast = this.customerGoogle.asObservable();
  constructor() { }
  setCustomerGoogle(customerGoogle: CustomerGoogle) {
    this.customerGoogle.next(customerGoogle);
  }
}

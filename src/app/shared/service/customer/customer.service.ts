import { Injectable } from '@angular/core';
import { environment } from 'environments/environment'
import { Http, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';
import { Customer, CustomerInfo } from '../../model/customer.model';
import {HttpService} from '../../../service/http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerSignInUrl = 'HomeOperation/GetSubCategory';
  tokenKey: string;
  tokenValue: string;
  url: string;
  constructor(private _http: Http, private _httpService: HttpService) {
    this.url = environment.apiUrl;
    this.tokenKey = environment.tokenKey;
    this.tokenValue = environment.tokenValue;
  }
  customerSignIn(customer: Customer): Observable<CustomerInfo> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(this.tokenKey, this.tokenValue);
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    const body = JSON.stringify({
      'Mobile': customer.Mobile,
      'Password': customer.Password,
      'FBId': customer.FBId,
      'GPId': customer.GPId
    });
    return this._http.post(this.url + 'HomeOperation/CustomerSignIn', body, options)
      .pipe(map((data: Response) => {
        return data.json() as CustomerInfo;
      }))
  }
  // customerSignIn(customer: Customer): Observable<CustomerInfo> {
  //   const params = JSON.stringify(customer);
  //   return this._httpService.post<CustomerInfo>(this.customerSignInUrl, params)
  // };
  customerSignUp(customer: Customer): Observable<CustomerInfo> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(this.tokenKey, this.tokenValue);
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    // const body = JSON.stringify({
    //   customer
    // });
    return this._http.post(this.url + 'HomeOperation/CustomerSignUp', customer, options)
      .pipe(map((data: Response) => {
        return data.json() as CustomerInfo;
      }))
  }
}

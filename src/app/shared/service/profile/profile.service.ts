import { CustomerInfo } from './../../model/customer.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';

import { HttpService } from '../../../service/http.service';
import { UserOrder } from '../../model/user-order.model';
import { OrderDetails } from '../../model/order-details.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  tokenKey: string;
  tokenValue: string;
  url: string;
  private orderUrl = 'HomeOperation/GetUserOrderList';
  private orderDetailsUrl = 'HomeOperation/GetUserOrderDetail';
  private uploadPhotoUrl = 'HomeOperation/UpdateUserProfileInfo'
  constructor(
    private _httpService: HttpService,
    private _http: Http
  ) {
    this.url = environment.apiUrl;
    this.tokenKey = environment.tokenKey;
    this.tokenValue = environment.tokenValue;
  }

  getOnGoingOrderList(params): Observable<UserOrder[]> {
    return this._httpService.post<UserOrder[]>(this.orderUrl, params)
  }
  getOrderDetails(params): Observable<OrderDetails> {
    return this._httpService.post<OrderDetails>(this.orderDetailsUrl, params)
  }
  // uploadPhoto(params) {
  //   return this._httpService.post<any>(this.uploadPhotoUrl, params)
  // }

  uploadPhoto(params: FormData): Observable<CustomerInfo> {
    const headers = new Headers();
    headers.append(this.tokenKey, this.tokenValue)
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    return this._http.post(this.url + 'HomeOperation/UpdateUserProfileInfo', params, options).pipe(map((data: Response) => {
      return data.json() as CustomerInfo;
    }));
  }

  editProfile(params: FormData): Observable<CustomerInfo> {
    const headers = new Headers();
    headers.append(this.tokenKey, this.tokenValue)
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    return this._http.post(this.url + 'HomeOperation/UpdateUserProfileInfo', params, options).pipe(map((data: Response) => {
      return data.json() as CustomerInfo;
    }));
  }
}

import { PaymentSessionKey } from './../../model/payment-session-key.model';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';
import { HttpService } from '../../../service/http.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentUrl = 'http://45.64.135.249:9000/api/PaymentManage/PaymentToSSL/'
  tokenKey: string;
  tokenValue: string;
  url: string;
  constructor(
    private _httpService: HttpService,
    private _http: Http
  ) {
    this.url = environment.apiUrl;
    this.tokenKey = environment.tokenKey;
    this.tokenValue = environment.tokenValue;
  }

  getPaymentSessionKey(params: FormData): Observable<PaymentSessionKey> {
    const headers = new Headers();
    headers.append(this.tokenKey, this.tokenValue)
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    return this._http.post(this.url + 'PaymentManage/PaymentToSSL', params, options).pipe(map((data: Response) => {
      return data.json() as PaymentSessionKey;
    }));
  }
}

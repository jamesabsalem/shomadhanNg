import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

import { HomeFeedBack } from '../../model/homeFeedBack.model';
import {CustomerReview} from '../../model/customer-review.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  tokenKey: string;
  tokenValue: string;
  url: string;
  public customerReview: CustomerReview[];

  constructor(private http: Http) {
    this.tokenKey = environment.tokenKey;
    this.tokenValue = environment.tokenValue;
    this.url = environment.apiUrl;
  }
  getCustomerFeedBack(): Observable<CustomerReview[]>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append(this.tokenKey, this.tokenValue)
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    return this.http.get(this.url + 'HomeOperation/GetAllCustomerReview', options)
      .pipe(map((data: Response) => {
        return data.json() as CustomerReview[]
      }));
  }
}

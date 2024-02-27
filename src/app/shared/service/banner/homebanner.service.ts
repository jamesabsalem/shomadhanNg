import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

import { HomeBanner } from '../../model/components.homeBanner';
import { MainService } from '../../model/mainservice.model';


@Injectable()
export class HomeBannerService {
  bannerList: HomeBanner[];
  mainServices: MainService[];
  url: string;
  tokenKey: string;
  tokenValue: string;

  constructor(private http: Http) {
    this.url = environment.apiUrl;
    this.tokenKey = environment.tokenKey;
    this.tokenValue = environment.tokenValue;
  }

  getHomeBannerList() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(this.tokenKey, this.tokenValue);
    const options = new RequestOptions({
    method: RequestMethod.Post,
    headers: headers
    });

    return this.http.get(this.url + 'HomeOperation/GetAllHomeBannerForWeb', options).pipe(map((data: Response) => {
      return data.json() as HomeBanner[];
    })).toPromise().then(x => {
      this.bannerList = x;
    })
      .catch(
        err => Observable.throw(err || 'Server error')
      );
  }
}

import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpService } from '../../../service/http.service';

import { Promise } from '../../model/promise.model';
import { Area } from '../../model/area.model';
import { Review } from '../../model/review.model';
import { SearchText } from '../../model/search-text.model';



@Injectable()
export class HomeService {
  private searchTextUrl = 'HomeOperation/SearchText';
  url: string;
  tokenKey: string;
  tokenValue: string;
  promises: Promise[];
  areas: Area[];
  reviews: Review[];

  constructor(private http: Http, private _httpService: HttpService) {
    this.url = environment.apiUrl;
    this.tokenKey = environment.tokenKey;
    this.tokenValue = environment.tokenValue;
  }

  getPromisesList() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(this.tokenKey, this.tokenValue);
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    })
    return this.http.get(this.url + 'HomeOperation/GetHomeGuarantee', options)
      .pipe(map((data: Response) => {
        return data.json() as Promise[];
      })).toPromise().then(x => {
        this.promises = x;
      })
  }

  getAvailableAreas() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(this.tokenKey, this.tokenValue);
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    })
    return this.http.get(this.url + 'ServiceInitiate/GetArea', options).pipe(map((data: Response) => {
      return data.json() as Area[];
    })).toPromise().then(x => {
      this.areas = x;
    })
  }

  getAvailableLocations() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(this.tokenKey, this.tokenValue);
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    })
    return this.http.get(this.url + 'ServiceInitiate/GetArea', options).pipe(map((data: Response) => {
      return data.json() as Area[];
    })).toPromise().then(x => {
      this.areas = x;
    })
  }
  getCustomerReviews(serviceCategoryId: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(this.tokenKey, this.tokenValue);
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    })
    const body = JSON.stringify({
      'ServiceCategoryId': serviceCategoryId
    });
    return this.http.post(this.url + 'HomeOperation/GetAllCustomerReviewByServiceCategoryId', body, options).pipe(map((data: Response) => {
      return data.json() as Review[];
    })).toPromise().then(x => {
      this.reviews = x;
    })
  }
  searchText(params): Observable<SearchText[]> {
    return this._httpService.post<SearchText[]>(this.searchTextUrl, params);
  }
}

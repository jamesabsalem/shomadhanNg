
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { environment } from 'environments/environment'
import { MainService } from '../../model/mainservice.model';
import { AvailabelService } from '../../model/availabelService.model';
import { ShomadhanService } from '../../model/ShomadhanService.model';
import { InnerServices } from '../../model/innerServices.model';
import { InnterCategoryDetails } from '../../model/innerCategoryDetails.mode';
import { RecomandedService } from './../../model/recomanded-service.model';

@Injectable()
export class CategoryService {
  tokenKey: string;
  tokenValue: string;
  url: string;
  public mainServices: MainService[];
  public innerCategory: MainService[];
  public innerCategoryDetails: InnterCategoryDetails[]
  public innerService: InnerServices;
  public subServices: MainService[];
  public availableService: AvailabelService[];
  constructor(private http: Http) {
    this.url = environment.apiUrl;
    this.tokenKey = environment.tokenKey;
    this.tokenValue = environment.tokenValue;
  }
  // get home main service category
  getMainServices(locationId: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append(this.tokenKey, this.tokenValue)
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    const body = JSON.stringify({ 'AreaId': locationId });
    return this.http.post(this.url + 'HomeOperation/GetServiceCategory', body, options)
      .pipe(map((data: Response) => {
        return data.json() as ShomadhanService;
      })).toPromise().then(x => {
        this.mainServices = x.ServiceCategoryDetails;
      })
  }
  // get home inner service category
  getInnerServices(locationId: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append(this.tokenKey, this.tokenValue)
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    const body = JSON.stringify({ 'AreaId': locationId });
    return this.http.post(this.url + 'HomeOperation/GetInnerCategory', body, options)
      .pipe(map((data: Response) => {
        return data.json() as InnerServices;
      })).toPromise().then(x => {
        this.innerService = x;
      })
  }
  // get inner main service category for nav
  getNavInnerServices(locationId: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append(this.tokenKey, this.tokenValue)
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    const body = JSON.stringify({ 'AreaId': locationId });
    return this.http.post(this.url + 'HomeOperation/GetInnerCategoryWebNav', body, options)
      .pipe(map((data: Response) => {
        return data.json() as InnerServices;
      })).toPromise().then(x => {
        this.innerService = x;
      })
  }
  // get home Recomanded Services
  getRecomandedServices(): Observable<RecomandedService[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append(this.tokenKey, this.tokenValue)
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    return this.http.get(this.url + 'HomeOperation/GetRecomendedService', options)
      .pipe(map((data: Response) => {
        return data.json() as RecomandedService[];
      }));
  }
}

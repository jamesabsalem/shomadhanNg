
import { Observable } from 'rxjs/Observable';
import { HttpService } from './../../../service/http.service';
import { Injectable } from '@angular/core';

import { PartnerInfo } from '../../model/partner-info.model';
import { CustomerReview } from '../../model/customer-review.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private partnerInfoUrl = 'HomeOperation/GetPartnerInfo';
  private customerReviewUrl = 'HomeOperation/GetCustomerReview';
  private partnerRegistationUrl = 'PartnerManage/CreatePartnerRequest'
  constructor(private _httpService: HttpService) { }

  // get partner information
  getPartnerInfo(params): Observable<PartnerInfo> {
    return this._httpService.post<PartnerInfo>(this.partnerInfoUrl, params)
  }
  // get customer review
  getCustomerReview(params): Observable<CustomerReview[]> {
    return this._httpService.post<CustomerReview[]>(this.customerReviewUrl, params)
  }
  partnerRegistation(params): Observable<Status> {
    return this._httpService.post<Status>(this.partnerRegistationUrl, params)
  }
}

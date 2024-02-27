import { CustomerInfo } from './../../model/customer.model';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpService } from './../../../service/http.service';
import { ForgetPasswordStatus } from '../../model/forget-password-status.model';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  private checkUrl = 'ExpertManage/FogetPasswordCheck';
  private changePasswordUrl = 'ExpertManage/InsertNewPassword/ ';

  constructor(
    private _httpService: HttpService
  ) { }
  forgetPasswordCheck(params): Observable<CustomerInfo> {
    return this._httpService.post<CustomerInfo>(this.checkUrl, params)
  }
  changePassword(params): Observable<ForgetPasswordStatus> {
    return this._httpService.post<ForgetPasswordStatus>(this.changePasswordUrl, params)
  }
}

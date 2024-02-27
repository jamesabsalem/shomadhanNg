import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../../service/http.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationUrl = 'HomeOperation/GetNotificationByUserId';
  constructor(
    private _httpService: HttpService
  ) { }
  getNotificationList(params): Observable<Notification[]> {
    return this._httpService.post<Notification[]>(this.notificationUrl, params)
  }
}

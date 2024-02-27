import { Injectable } from '@angular/core';
import { ScheduleTime } from '../models/schedule-time';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class ScheduleService {
 // http://45.64.135.249:9000/api/HomeOperation/GetPartnerServiceScheduleTime

 private scheduleTimeUrl = 'HomeOperation/GetPartnerServiceScheduleTime';

 constructor(private httpService: HttpService) {}

  getAllScheduleTimes(): Observable<ScheduleTime[]> {
    return this.httpService.post<ScheduleTime[]>(this.scheduleTimeUrl, {});
  }

}

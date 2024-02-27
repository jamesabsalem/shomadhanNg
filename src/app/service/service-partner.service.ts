import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { ServicePartner } from '../models/service-partner.model';

@Injectable()
export class ServicePartnerService {

  private servicePartnerUrl = 'HomeOperation/GetPartnerByScheduleTimeDateServices';

  constructor(private httpService: HttpService) {}

   getAllServicePartners(params): Observable<ServicePartner[]> {
     return this.httpService.post<ServicePartner[]>(this.servicePartnerUrl, params);
   }

}

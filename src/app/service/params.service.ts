import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

export class Param {
  Id: number;
  Name: string;
}

@Injectable()
export class ParamsService {
  private areaIdByNameUrl = 'HomeOperation/GetAreaIdByName';
  private serviceByNameUrl = 'HomeOperation/GetServiceIdByName';
  private innerIdByNameUrl = 'HomeOperation/GetInnerIdByName';

  constructor(private httpService: HttpService) {}

  getAreaIdByName(name: string): Observable<Param> {
    return this.httpService.post<Param>(this.areaIdByNameUrl, { Name: name });
  }

  getServiceIdByName(name: string): Observable<Param> {
    return this.httpService.post<Param>(this.serviceByNameUrl, { Name: name });
  }

  getInnerIdByName(name: string): Observable<Param> {
    return this.httpService.post<Param>(this.innerIdByNameUrl, { Name: name });
  }
}

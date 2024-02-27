import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CustomercookiesService } from './customercookies.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private _customercookiesService: CustomercookiesService) { }
  canActivate() {
    let isActive = false;
    this._customercookiesService.customerInfoCast.subscribe(customer => {
      if (customer.Status) {
        isActive = true
        return isActive;
      }
      isActive = false;
    })
    return isActive;
  }
}

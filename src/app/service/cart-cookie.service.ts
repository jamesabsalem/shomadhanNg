import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StoredDataTypes } from './stored-data-types.enum';
import { CartDetailsInfo } from '../models/mapped-question';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CartCookieService {
  readonly expireDays = 7;
  readonly domain = null;
  private addCartInfo = new BehaviorSubject<boolean>(true)
  public addCartInfo$ = this.addCartInfo.asObservable();

  constructor(private cookieService: CookieService) {}

  storeCartData(
    key: StoredDataTypes.CurrentProcessingCart | StoredDataTypes.AllCartInfo,
    data
  ) {
    // this.cookieService.delete(key, '/', this.domain);

    const temp = JSON.stringify(data);
    setTimeout(() => {
      this.cookieService.set(key, temp, this.expireDays, '/', this.domain);
    }, 2000);

    if (key === StoredDataTypes.AllCartInfo) {
      setTimeout(() => {
        this.addCartInfo.next(true);
      }, 3000);
    }
  }

  // storeServiceData(key: StoredDataTypes.CurrentProcessingServiceData, data) {
  //   this.cookieService.set(key, JSON.stringify(data), this.expireDays, '/', this.domain);
  // }

  getCartData(
    key: StoredDataTypes.CurrentProcessingCart
  ) {
    const data = this.cookieService.get(key);
    if (!!data) {
      return JSON.parse(data) as CartDetailsInfo;
    }
    return new CartDetailsInfo();
  }

  getAllCartItems(
    key: StoredDataTypes.AllCartInfo
  ) {
    const items = this.cookieService.get(key);
    if (!!items) {
      const cartInfos = JSON.parse(items)
      // return cartInfos.data as Array<CartDetailsInfo>;
      return cartInfos['data'];
    }
    return [];
  }

  // getServiceData(key: StoredDataTypes.CurrentProcessingServiceData) {
  //   const data = this.cookieService.get(key);
  //   if (!!data) {
  //     return JSON.parse(data);
  //   }
  // }

  deleteCartData(
    key: StoredDataTypes.CurrentProcessingCart | StoredDataTypes.AllCartInfo
  ) {
    this.cookieService.delete(key, '/', this.domain);

    if (key === StoredDataTypes.AllCartInfo) {
      this.addCartInfo.next(true);
    }
  }

  // deleteServiceData(key: StoredDataTypes.CurrentProcessingServiceData) {
  //   this.cookieService.delete(key);
  // }

  hasCookies(key: any): boolean {
    return this.cookieService.check(key);
  }

  getUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
  }
}

import { Injectable } from '@angular/core';
import { StoredDataTypes } from './stored-data-types.enum';
import { CartDetailsInfo } from '../models/mapped-question';
import { BehaviorSubject } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable()
export class CartStorageService {
  private addCartInfo = new BehaviorSubject<boolean>(true);
  public addCartInfo$ = this.addCartInfo.asObservable();

  constructor(protected localStorage: LocalStorage) {}

  storeCartData(key: StoredDataTypes.CurrentProcessingCart | StoredDataTypes.AllCartInfo | StoredDataTypes.OptionScrollPosition, data) {
    return this.localStorage.setItem(key, data);
  }

  getCartData<T>(key: StoredDataTypes.CurrentProcessingCart | StoredDataTypes.AllCartInfo | StoredDataTypes.OptionScrollPosition) {
    return this.localStorage.getItem<T>(key);
  }

  getAllCartItems<T>(key: StoredDataTypes.AllCartInfo) {
    return this.localStorage.getItem<T>(key);
  }

  deleteCartData(key: StoredDataTypes.CurrentProcessingCart | StoredDataTypes.AllCartInfo) {
    return this.localStorage.removeItem(key);
  }

  sendAddCartNotification() {
    this.addCartInfo.next(true);
  }

  getUniqueId() {
    return (
      'id-' +
      Math.random()
        .toString(36)
        .substr(2, 16)
    );
  }
}

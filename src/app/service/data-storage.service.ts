import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable()
export class DataStorage {
  public KEYS = {
    INNER_CATEGORY_DATA: 'InnerCategory'
  };

  constructor(protected localStorage: LocalStorage) {}

  public setItem(key: string, data: any) {
    return this.localStorage.setItem(key, data);
  }

  public getItem<T>(key: string) {
    return this.localStorage.getItem<T>(key);
  }

  public clearAll() {
    return this.localStorage.clear();
  }

  public clear(key: string) {
    return this.localStorage.removeItem(key);
  }
}

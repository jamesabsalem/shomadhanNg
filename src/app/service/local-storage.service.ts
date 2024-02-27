import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    public KEYS = {
      ALL_CART_INFO: 'AllCartInfo',
      CURRENT_PROCESSING_CART: 'CurrentProcessingCart'
    };

    /**
     * Method will convert any data to the JSON and store it in the localStorage
     * @param {string} key
     * @param data
     * @return {void}
     */
    public setItem( key: string, data: any ): void {
        localStorage.setItem( key, JSON.stringify( { data } ) );
    }

    /**
     * Method will return any data from localStorage by key or null
     * @param {string} key
     * @return {any|null} stored data
     */
    public getItem( key: string ): any {
        return JSON.parse( localStorage.getItem( key ) ) ? JSON.parse( localStorage.getItem( key ) ).data : null;
    }

    /**
     * Will remove all data from localStorage
     */
    public clearAll(): void {
        localStorage.clear();
    }

    /**
     * Will remove one field from localStorage by key
     * @param {string} key
     */
    public clear( key: string ): void {
        localStorage.removeItem( key );
    }
}

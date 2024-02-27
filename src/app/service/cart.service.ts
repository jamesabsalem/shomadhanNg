import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/internal/Observable';
import { PlaceOrder } from '../models/place-order.model';

@Injectable()
export class CartService {
  private placeOrderUrl = 'HomeOperation/PlaceOrder';
  private imageSaveUrl = 'HomeOperation/OrderPlacePhoto';

  constructor(private httpService: HttpService) {}

  checkoutCart(placeOrder: PlaceOrder): Observable<any> {
    return this.httpService.post<PlaceOrder>(this.placeOrderUrl, placeOrder);
  }

  saveImages(images) {
    return this.httpService.post<any>(this.imageSaveUrl, images);
  }
}

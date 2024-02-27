import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { IsOrder } from '../../model/is-order.model';

@Injectable({
  providedIn: 'root'
})
export class IsOrderService {
  default: IsOrder = ({
    isEmpty: false,
    isOnGoing: false,
    isOrderDetails: false
  })
  private isOrder = new BehaviorSubject<IsOrder>(this.default);
  public isOrderCast = this.isOrder.asObservable();
  private orderId = new BehaviorSubject<string>('');
  public orderIdCast = this.orderId.asObservable();
  constructor() { }

  setIsOrder(order: IsOrder) {
    this.isOrder.next(order);
  }
  setOrderId(id: string) {
    this.orderId.next(id);
  }
}

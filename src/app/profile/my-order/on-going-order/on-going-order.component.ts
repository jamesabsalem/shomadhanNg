import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../../../shared/service/profile/profile.service';
import { CustomercookiesService } from '../../../shared/service/common/customercookies.service';
import { UserOrder } from '../../../shared/model/user-order.model';
import { IsOrder } from '../../../shared/model/is-order.model';
import { IsOrderService } from '../../../shared/service/common/is-order.service';


@Component({
  selector: 'on-going-order',
  templateUrl: './on-going-order.component.html',
  styleUrls: ['./on-going-order.component.scss']
})
export class OnGoingOrderComponent implements OnInit {
  orderList: UserOrder[];
  status = {
    isPending: false,
    isAccepted: false,
    isOnGoing: false,
    isServed: false,
    isCancel: false
  }
  constructor(private _profileService: ProfileService,
    private _customercookiesService: CustomercookiesService,
    private _isOrderService: IsOrderService) { }

  ngOnInit() {
    this.getUserId();
  }
  getUserId() {
    this._customercookiesService.customerInfoCast.subscribe(user => {
      if (user.Status) {
        this.getOnGoingOrderList(user.Data[0].UserId);
      }
    })
  }
  getOnGoingOrderList(userId: number) {
    const params = {
      UserId: userId
    }
    this._profileService.getOnGoingOrderList(params).subscribe(orderList => {
      this.orderList = orderList;
      let order: IsOrder
      if (orderList.length > 0) {
        order = {
          isEmpty: false,
          isOnGoing: true,
          isOrderDetails: false
        }
      } else {
        order = {
          isEmpty: true,
          isOnGoing: false,
          isOrderDetails: false
        }
      }
      this._isOrderService.setIsOrder(order)
    })
  }
  onClickViewDetails(orderId: string) {
    const order: IsOrder = ({
      isEmpty: false,
      isOnGoing: false,
      isOrderDetails: true
    })
    this._isOrderService.setIsOrder(order)
    this._isOrderService.setOrderId(orderId);
  }

}

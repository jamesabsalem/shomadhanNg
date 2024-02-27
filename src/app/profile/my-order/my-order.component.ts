import { Component, OnInit } from '@angular/core';
import {IsOrder} from '../../shared/model/is-order.model';
import {IsOrderService} from '../../shared/service/common/is-order.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  order: IsOrder;
  constructor(private _isOrderService: IsOrderService) { }

  ngOnInit() {
    this._isOrderService.isOrderCast.subscribe(order => {
      this.order = order;
    })
  }

}

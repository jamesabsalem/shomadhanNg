import { PaymentService } from './../../../shared/service/payment/payment.service';
import { CustomercookiesService } from './../../../shared/service/common/customercookies.service';
import { Customer } from './../../../shared/model/customer.model';
import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { ProfileService } from '../../../shared/service/profile/profile.service';
import { IsOrderService } from '../../../shared/service/common/is-order.service';
import { IsOrder } from '../../../shared/model/is-order.model';
import { OrderDetails } from '../../../shared/model/order-details.model';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PaymentSessionKey } from '../../../shared/model/payment-session-key.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  tran_id: Guid;
  OrderDetails: OrderDetails;
  OrderId: string;
  customer: Customer
  PaymentSessionKey: PaymentSessionKey
  constructor(
    private _profileService: ProfileService,
    private _isOrderService: IsOrderService,
    config: NgbRatingConfig,
    private _router: Router,
    private _customercookiesService: CustomercookiesService,
    private _paymentService: PaymentService
  ) {
    this.tran_id = Guid.create();
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
    this.getOrderId();
    this.getUser();
  }
  getOrderId() {
    this._isOrderService.orderIdCast.subscribe(orderId => {
      if (orderId != null && orderId !== '') {
        this.OrderId = orderId;
        this.orderDetails(orderId);
      }
    })
  }
  orderDetails(id: string) {
    const orderId = {
      'OrderId': id
    }
    this._profileService.getOrderDetails(orderId).subscribe(orderDetails => {
      this.OrderDetails = orderDetails;
    })
  }

  onClickBack() {
    const order: IsOrder = ({
      isEmpty: false,
      isOnGoing: true,
      isOrderDetails: false
    })
    this._isOrderService.setIsOrder(order);
  }
  getUser() {
    this._customercookiesService.customerInfoCast.subscribe(res => {
      this.customer = res.Data[0]
    })
  }
  onClickPayment() {
    // this._router.navigate(['./payment'])
    const fd = new FormData()
    fd.append('payment_url', 'https://sandbox.sslcommerz.com/gwprocess/v3/api.php');
    fd.append('store_id', 'shoma5b9e088674963');
    fd.append('store_passwd', 'shoma5b9e088674963@ssl');
    fd.append('total_amount', this.OrderDetails.OrderSummary.TotalServiceCharge.toString());
    fd.append('currency', 'BDT');
    fd.append('tran_id', this.tran_id.toString());
    fd.append('success_url', 'http://localhost:4200/profile');
    fd.append('fail_url', 'http://localhost:4200/home');
    fd.append('cancel_url', 'http://localhost:4200/profile/my-order');

    fd.append('emi_option', '0');

    fd.append('cus_name', this.customer.FullName);
    fd.append('cus_email', this.customer.Email);
    fd.append('cus_add1', this.customer.Address1);
    fd.append('cus_add2', this.customer.Address2);
    fd.append('cus_city', '');
    fd.append('cus_state', '');
    fd.append('cus_postcode', '');
    fd.append('cus_country', '');
    fd.append('cus_phone', this.customer.Mobile);
    fd.append('cus_fax', '');

    fd.append('ship_name', '');
    fd.append('ship_add1', '');
    fd.append('ship_add2', '');
    fd.append('ship_city', '');
    fd.append('ship_state', '');
    fd.append('ship_postcode', '');
    fd.append('ship_country', '');
    fd.append('multi_card_name', '');
    fd.append('value_a', '');
    fd.append('value_b', '');
    fd.append('value_c', '');
    fd.append('value_d', '');

    this._paymentService.getPaymentSessionKey(fd).subscribe(res => {
      if (res.status === 'SUCCESS') {
        this.PaymentSessionKey = res;
        window.location.href = this.PaymentSessionKey.GatewayPageURL;
      }
    })
  }

  getInvoiceRouterLink() {
    return `/my-order/invoice/${this.OrderId}`;
  }
}

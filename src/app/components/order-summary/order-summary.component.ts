import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { OrderConfirmPopupComponent } from '../order-confirm-popup/order-confirm-popup.component';
import { StoredDataTypes } from '../../service/stored-data-types.enum';
import { ServicePartner } from '../../models/service-partner.model';
import { Input } from '@angular/core';
import { ScheduleInfo } from '../../models/schedule-time';
import { DeliveryInfo } from '../../models/place-order.model';
import { CartDetailsInfo } from '../../models/mapped-question';
import { CartStorageService } from '../../service/cart-storage.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  @Input() scheduleInfo: ScheduleInfo;
  @Input() servicePartnerInfo: ServicePartner;
  @Input() deliveryInfo: DeliveryInfo ;
  cartDetailsInfo: CartDetailsInfo;

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService, private cartStorageService: CartStorageService) {}

  ngOnInit() {
    // this.cartDetailsInfo = this.cartCookieService.getCartData(StoredDataTypes.CurrentProcessingCart);
    this.cartStorageService.getCartData<CartDetailsInfo>(StoredDataTypes.CurrentProcessingCart).subscribe(data => {
      this.cartDetailsInfo = data;
    });

  }

  openModalWithComponent() {
    const config = {
      backdrop: true,
      ignoreBackdropClick: false
    };
    this.bsModalRef = this.modalService.show(
      OrderConfirmPopupComponent,
      Object.assign({}, { class: 'confirm_modal_wrapper' }, { backdrop: 'static', keyboard: false })
    );
    // this.bsModalRef = this.modalService.show(OrderConfirmPopupComponent, config);
  }

  getCartDetailsInfo() {
    // const cartDetailsInfo = this.cartStorageService.getCartData(StoredDataTypes.CurrentProcessingCart);
    this.cartStorageService.getCartData<CartDetailsInfo>(StoredDataTypes.CurrentProcessingCart).subscribe(data => {
      this.cartDetailsInfo = data;
    });
  }

  get serviceTypes() {
    if (!!this.cartDetailsInfo && !!this.cartDetailsInfo.CartOrderData && !!this.cartDetailsInfo.CartOrderData.ServiceOptionList) {
      return this.cartDetailsInfo.CartOrderData.ServiceOptionList.map(x => x.ServiceType).join(', ');
    }
  }
}

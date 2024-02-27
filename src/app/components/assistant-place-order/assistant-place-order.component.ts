import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomercookiesService } from '../../shared/service/common/customercookies.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CustomerInfo, Customer } from '../../shared/model/customer.model';
import {
  AssistantPlaceOrder,
  AssistantInnerCategory
} from '../../models/assistant-inner-category.model';
import { AssistantInnerCategoryService } from '../../service/assistant-inner-category.service';
import { OrderConfirmPopupComponent } from '../order-confirm-popup/order-confirm-popup.component';

@Component({
  selector: 'app-assistant-place-order',
  templateUrl: './assistant-place-order.component.html',
  styleUrls: ['./assistant-place-order.component.scss']
})
export class AssistantPlaceOrderComponent implements OnInit {
  // @ViewChild('orderSummary')
  // orderSummary;

  isShowOrderSummary = false;
  isShowSignin = false;
  customerInfo: Customer;
  assistantInnerCategory: AssistantInnerCategory;

  constructor(
    public bsModalRef: BsModalRef,
    private customercookiesService: CustomercookiesService,
    private assistantInnerCategoryService: AssistantInnerCategoryService,
    private modalService: BsModalService,
  ) {}

  ngOnInit() {
    this.showLoginScreen();
  }

  showLoginScreen() {
    this.customercookiesService.customerInfoCast.subscribe(
      (data: CustomerInfo) => {
        const { Status } = data;
        if (!!data && !!data.Data) {
          this.customerInfo = data.Data[0];

          if (!!Status) {
            this.isShowOrderSummary = true;
            this.isShowSignin = false;
          } else {
            this.isShowSignin = true;
            this.isShowOrderSummary = false;
          }
        } else {
          this.isShowSignin = true;
          this.isShowOrderSummary = false;
        }
      }
    );
  }

  onCheckoutClickHandler() {
    const assistantPlaceOrder: AssistantPlaceOrder = new AssistantPlaceOrder();
    const { UserId } = this.customerInfo;
    const { InnerCategoryId } = this.assistantInnerCategory;
    assistantPlaceOrder.UserId = UserId;
    assistantPlaceOrder.InnerCategoryId = InnerCategoryId;

    this.assistantInnerCategoryService
      .submitAssistantPlaceOrder(assistantPlaceOrder)
      .subscribe(data => {
        console.log(
          'TCL: AssistantPlaceOrderComponent -> onCheckoutClickHandler -> data',
          data
        );
        this.openModalWithComponent();
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
}

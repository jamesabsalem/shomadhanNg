import { Component, OnInit } from '@angular/core';
import { CustomerInfo, Customer } from '../../shared/model/customer.model';
import { Input } from '@angular/core';
import { AssistantInnerCategory, AssistantPlaceOrder } from '../../models/assistant-inner-category.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AssistantInnerCategoryService } from '../../service/assistant-inner-category.service';
import { OrderConfirmPopupComponent } from '../order-confirm-popup/order-confirm-popup.component';

@Component({
  selector: 'app-assistant-order-summary',
  templateUrl: './assistant-order-summary.component.html',
  styleUrls: ['./assistant-order-summary.component.scss']
})
export class AssistantOrderSummaryComponent implements OnInit {
  @Input()
  assistantInnerCategory: AssistantInnerCategory;
  @Input()
  customerInfo: Customer;

  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private assistantInnerCategoryService: AssistantInnerCategoryService
  ) {}

  ngOnInit() {
    // const assistantPlaceOrder: AssistantPlaceOrder = new AssistantPlaceOrder();
    // const { UserId } = this.customerInfo.Data;
    // const { InnerCategoryId } = this.assistantInnerCategories;
    // assistantPlaceOrder.UserId = UserId;
    // assistantPlaceOrder.InnerCategoryId = InnerCategoryId;

    // this.assistantInnerCategoryService
    //   .submitAssistantPlaceOrder<AssistantPlaceOrder>(assistantPlaceOrder)
    //   .subscribe(data => {});
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



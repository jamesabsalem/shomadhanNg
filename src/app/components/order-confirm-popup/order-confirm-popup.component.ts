import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewEncapsulation } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-order-confirm-popup',
  templateUrl: './order-confirm-popup.component.html',
  styleUrls: ['./order-confirm-popup.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class OrderConfirmPopupComponent implements OnInit {

  constructor(private modalService: NgbModal, public bsModalRef: BsModalRef, private bsModalService: BsModalService) {}


  ngOnInit() {
  }


  // openVerticallyCentered(content) {
  //   this.modalService.open(content, { centered: true });
  // }


  // openModalWithComponent(subCategory) {
  //   const initialState = {
  //     subCategory: subCategory
  //   };
  //   this.bsModalRef = this.modalService.show(
  //     SubCategoryModalComponent,
  //     Object.assign({}, { class: 'custom_modal_wrapper' }, { initialState }, { backdrop: 'static', keyboard: false })
  //   );
  //   this.bsModalRef.content.closeBtnName = 'Close';
  // }

  onOkButtonClickHanlder() {
    this.bsModalRef.hide();
    this.bsModalService.hide(1);
  }

}

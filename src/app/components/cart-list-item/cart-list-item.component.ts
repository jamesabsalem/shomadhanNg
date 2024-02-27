import { Component, OnInit, EventEmitter } from '@angular/core';
import { CartStorageService } from '../../service/cart-storage.service';
import { CartDetailsInfo } from '../../models/mapped-question';
import { StoredDataTypes } from '../../service/stored-data-types.enum';
import { BsModalRef } from 'ngx-bootstrap';
import { Output } from '@angular/core';

@Component({
  selector: 'app-cart-list-item',
  templateUrl: './cart-list-item.component.html',
  styleUrls: ['./cart-list-item.component.scss']
})
export class CartListItemComponent implements OnInit {
  @Output()
  orderPlacement: EventEmitter<CartDetailsInfo> = new EventEmitter<CartDetailsInfo>();
  allCartItems: CartDetailsInfo[] = [];
  showCartList = true;
  showOrderPlacement = false;

  constructor(private cartStorageService: CartStorageService, public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.getAllCartItems();
  }

  getAllCartItems() {
    this.cartStorageService.getCartData<CartDetailsInfo[]>(StoredDataTypes.AllCartInfo).subscribe(data => {
      if (!!data) {
        this.allCartItems = data;

        // const filteredItems = allCartItems.filter(x => x.Id !== cartDetailsInfo.Id);
        // this.cartStorageService.storeCartData(StoredDataTypes.AllCartInfo, filteredItems).subscribe(() => {
        //   this.cartStorageService.sendAddCartNotification();
        // });
      }
    });
  }

  onShowOrderPlacement(cartItem) {}

  onOrderPlacementClickHandler(cartItem) {
    this.orderPlacement.next(cartItem);
  }

  removeCartItemFromCookie(cartDetailsInfo: CartDetailsInfo) {
    this.cartStorageService.getCartData<CartDetailsInfo[]>(StoredDataTypes.AllCartInfo).subscribe(data => {
      if (!!data) {
        const allCartItems = data;
        const filteredItems = allCartItems.filter(x => x.Id !== cartDetailsInfo.Id);
        this.cartStorageService.storeCartData(StoredDataTypes.AllCartInfo, filteredItems).subscribe(() => {
          this.allCartItems = filteredItems;

          if (this.allCartItems === null || (this.allCartItems && this.allCartItems.length === 0)) {
            this.bsModalRef.hide();
          }

          this.cartStorageService.sendAddCartNotification();
        });
      }
    });
  }
}

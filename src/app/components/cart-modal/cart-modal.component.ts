import { CartDetailsInfo } from './../../models/mapped-question';
import { Component, OnInit } from '@angular/core';
import { CartStorageService } from '../../service/cart-storage.service';
import { StoredDataTypes } from '../../service/stored-data-types.enum';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {
  showCartList = true;
  showOrderPlacement = false;

  constructor(private cartStorageService: CartStorageService) {}

  ngOnInit() {}

  onOrderPlacement(cartDetailsInfo: CartDetailsInfo) {
    this.showCartList = false;
    this.showOrderPlacement = true;
    console.log('TCL: CartModalComponent -> onOrderPlacement -> cartDetailsInfo', cartDetailsInfo);
    this.cartStorageService.storeCartData(StoredDataTypes.CurrentProcessingCart, cartDetailsInfo).subscribe(() => {});
  }
}

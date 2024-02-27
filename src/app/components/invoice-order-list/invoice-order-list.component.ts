import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice.model';
import { Input } from '@angular/core';

@Component({
  selector: 'app-invoice-order-list',
  templateUrl: './invoice-order-list.component.html',
  styleUrls: ['./invoice-order-list.component.scss']
})
export class InvoiceOrderListComponent implements OnInit {
  @Input()
  invoiceDetails: Invoice;

  constructor() {}

  ngOnInit() {}

  discountPrice(invoice) {
    return (invoice.UnitOrderPrice * invoice.UnitOrderQty) * this.getPercentage(invoice.UnitOrderQty + 1);
  }

  getPercentage(qty) {
    let percentage = 0;

    if (qty >= 7) {
      return 10 / 100;
    }

    switch (qty) {
      case 2:
        percentage = 5 / 100;
        break;
      case 3:
        percentage = 6 / 100;
        break;
      case 4:
        percentage = 7 / 100;
        break;
      case 5:
        percentage = 8 / 100;
        break;
      case 6:
        percentage = 9 / 100;
        break;
      case 7:
        percentage = 10 / 100;
        break;
      default:
        break;
    }
    return percentage;
  }
}

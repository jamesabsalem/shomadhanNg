import { Component, OnInit } from '@angular/core';
import { HostBinding } from '@angular/core';
import { InvoiceService } from '../../service/invoice.service';
import { Invoice } from '../../models/invoice.model';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  @HostBinding('class.invoice_wrapper')
  true;

  invoiceDetails: Invoice;

  shomadhanDiscount = 0;
  afterTotalDiscountPrice = 0;

  invoiceDate =  moment().format('DD-MM-YYYY');

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const { orderId } = params;
      this.getInvoiceDetails(orderId);
    });
  }

  onPrintClickHandler(evt) {
    window.print();
  }

  getInvoiceDetails(orderId: string) {
    this.invoiceService.getInvoiceDetails(orderId).subscribe((data: Invoice) => {
      this.invoiceDetails = data;
    });
  }

  getPercentage(qty) {
    let percentage = 0;

    if (qty >= 7) {
      return 10;
    }

    switch (qty) {
      case 2:
        percentage = 5;
        break;
      case 3:
        percentage = 6;
        break;
      case 4:
        percentage = 7;
        break;
      case 5:
        percentage = 8;
        break;
      case 6:
        percentage = 9;
        break;
      case 7:
        percentage = 10;
        break;
      default:
        break;
    }
    return percentage;
  }

  afterDiscountPrice(invoiceDetails: Invoice) {
    const price =
      (invoiceDetails.OrderSummery.TotalServiceCharge * this.getPercentage(invoiceDetails.OrderSummery.TotalOrderQty)) /
      100;

    const afterDisPrice = invoiceDetails.OrderSummery.TotalServiceCharge - price;
    this.afterTotalDiscountPrice = afterDisPrice;
    return afterDisPrice;
  }

  payableAmount() {

  }
}

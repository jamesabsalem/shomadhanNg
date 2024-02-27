import { PaymentService } from './../shared/service/payment/payment.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  constructor(
    private _paymentService: PaymentService
  ) { }

  ngOnInit() {
    // this._paymentService.getPaymentSessionKey(this.payment).subscribe(res => {
    //   console.log(res);
    //   console.log('payment service working')
    // })
  }

}

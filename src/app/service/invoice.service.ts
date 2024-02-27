import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice.model';

@Injectable()
export class InvoiceService {
  private invoiceUrl = 'HomeOperation/GetOngoingOrderDetail';

  constructor(private httpService: HttpService) {}

  getInvoiceDetails(orderId: string): Observable<Invoice> {
    return this.httpService.post<Invoice>(this.invoiceUrl, { OrderId: orderId });
  }
}

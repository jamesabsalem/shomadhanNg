import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { AssistantInnerCategory, AssistantPlaceOrder } from '../models/assistant-inner-category.model';

@Injectable()
export class AssistantInnerCategoryService {
  private url = 'AssistantOrder/GetAssistantInnerCategory';
  private placeOrderUrl = 'AssistantOrder/AssistantPlaceOrder';

  constructor(private httpService: HttpService) {}

  getAssistantInnerCategories(areaId: number): Observable<AssistantInnerCategory[]> {
    return this.httpService.post<AssistantInnerCategory[]>(this.url, { AreaId: areaId });
  }

  submitAssistantPlaceOrder(assistantPlaceOrder: AssistantPlaceOrder) {
    return this.httpService.post<AssistantPlaceOrder>(this.placeOrderUrl, assistantPlaceOrder);
  }

}

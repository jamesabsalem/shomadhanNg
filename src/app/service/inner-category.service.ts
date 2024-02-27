import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/internal/Observable';
import { InnerCategory } from '../models/inner-category.model';

@Injectable()
export class InnerCategoryService {
  innerCategoriesUrl = 'HomeOperation/GetInnerCategories';

  constructor(private httpService: HttpService) {}

  getAllInnerCategories(params): Observable<InnerCategory[]> {
    return this.httpService.post<InnerCategory[]>(this.innerCategoriesUrl, params);
  }
}

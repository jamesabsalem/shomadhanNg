import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { SubCategory } from '../models/sub-category.model';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { MappedQuestion } from '../models/mapped-question';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  routeUrl = 'HomeOperation/GetSubCategory';
  questionMappingRouteUrl = 'HomeOperation/GetQuestions';
  subCategoryOptionUrl = 'HomeOperation/GetSubCategoryOption';
  _lastStepSavedQuestionData: any;
  _lastStepSavedOptionData: any;

  constructor(private httpService: HttpService) {}

  getAllSubCategories(params): Observable<SubCategory[]> {
    return this.httpService.post<SubCategory[]>(this.routeUrl, params);
  }

  getAllMappedQuestionForSubCategory(params) {
    return this.httpService.post<MappedQuestion>(this.questionMappingRouteUrl, params);
  }

  getAllSubCategoryOption(params) {
    return this.httpService.post<SubCategory[]>(this.subCategoryOptionUrl, params);
  }

  set setLastStepSavedQuestionData(value) {
    this._lastStepSavedQuestionData = value;
  }

  get getLastStepSavedQuestionData() {
    return this._lastStepSavedQuestionData;
  }

  set setLastStepSavedOptionData(value) {
    this._lastStepSavedOptionData = value;
  }

  get getLastStepSavedOptionData() {
    return this._lastStepSavedOptionData;
  }
}

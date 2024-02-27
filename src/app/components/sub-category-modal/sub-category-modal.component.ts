import { CustomerResponse, QuestionAndAnswer } from '../../models/mapped-question';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { SubCategoryService } from '../../service/sub-category.service';
import { MappedQuestion, Question, QuestionAndOption, Option } from '../../models/mapped-question';
import { SubCategory } from '../../models/sub-category.model';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sub-category-modal',
  templateUrl: './sub-category-modal.component.html',
  styleUrls: ['./sub-category-modal.component.scss']
})
export class SubCategoryModalComponent implements OnInit {
  showSubCatgoryOption = false;
  subCategory: SubCategory;
  serviceData: any; // AreaId, ServiceCategoryId, InnerCategoryId
  showLastStepData: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  orderPlacementStep$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showOrderPlacementStep = false;
  showSubCategoryQuestion = true;
  isShowSubCatgoryOptionBackButton = true;
  subCategoryCustomerResponse: QuestionAndAnswer; // customer choices

  constructor() {}

  ngOnInit() {
    this.orderPlacementStep$.subscribe(value => {
      this.showOrderPlacementStep = value;
      this.showHideOrderPlacementStep(this.showOrderPlacementStep);
    });
  }

  onShowCategoryOptionHandler(data) {
    // this.subCategoryCustomerResponse = {
    //   QuestionMappingId: this.subCategory.QuestionMappingId,
    //   Answers: data.subCategoryCustomerResponses
    // };
    this.subCategoryCustomerResponse = {
      QuestionMappingId: this.subCategory.QuestionMappingId,
      Answers: Array.from(data.subCategoryCustomerResponses.values())
    };
    this.isShowSubCatgoryOptionBackButton = data.isShowSubCatgoryOptionBackButton;
    this.showSubCatgoryOption = data.isShowSubCatgoryOption;
    // this.showSubCatgoryOption = isShow;
    this.showOrderPlacementStep = false;
    this.showSubCategoryQuestion = false;
  }

  onShowSubCategoryQuestionHandler(isShow) {
    this.showSubCatgoryOption = isShow;
    this.showOrderPlacementStep = false;
    this.showSubCategoryQuestion = false;
    this.showLastStepData.next(true);
    // this.showLastStepData.complete();
  }

  showHideOrderPlacementStep(showOrderPlacementStep) {
    if (showOrderPlacementStep) {
      this.showSubCatgoryOption = false;
      this.showSubCategoryQuestion = false;
    }
  }
}

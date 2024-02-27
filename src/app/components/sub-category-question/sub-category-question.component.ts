import { CustomerResponse } from '../../models/mapped-question';
import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { SubCategoryService } from '../../service/sub-category.service';
import { MappedQuestion, Question, QuestionAndOption, Option } from '../../models/mapped-question';
import { SubCategory } from '../../models/sub-category.model';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-sub-category-question',
  templateUrl: './sub-category-question.component.html',
  styleUrls: ['./sub-category-question.component.scss']
})
export class SubCategoryQuestionComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  subCategory: SubCategory;
  @Output()
  showSubCategoryOption: EventEmitter<any> = new EventEmitter();
  // @Output() showLastStepData: EventEmitter<boolean> = new EventEmitter();
  @Input()
  // showLastStepData: Subject<any> = new Subject<any>();
  showLastStepData: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  subCategoryCaption = '';

  // subCategory: SubCategory;
  mappedQuestions: MappedQuestion;
  preparedMappedQuestions = new Map();
  questions: Question[] = [];
  questionAndOptions: QuestionAndOption = new QuestionAndOption();
  customerResponses = new Map();
  currentStep = 1;

  isShowSubCatgoryOption = false;
  isShowLastStepData = false;
  subscriptionShowLastStepData: Subscription;

  isShowSubCatgoryOptionBackButton = true;

  constructor(public bsModalRef: BsModalRef, private subCategoryService: SubCategoryService) {}

  ngOnInit() {
    this.subCategoryCaption = this.subCategory.Name;

    this.preparedMappedQuestions.clear();
    this.getAllMappedQestion(this.subCategory);

    this.subscriptionShowLastStepData = this.showLastStepData.subscribe(isShow => {
      if (isShow) {
        this.customerResponses = this.subCategoryService.getLastStepSavedQuestionData;
        this.isShowLastStepData = isShow;
        this.resetquestionAndOptions();
        this.showingQuestionAndOptions(this.currentStep);
      }
    });
  }

  ngAfterViewInit() {
    // if (this.isShowLastStepData) {
    //   this.showingQuestionAndOptions(this.currentStep);
    // }
  }

  getAllMappedQestion({ QuestionMappingId }) {
    this.subCategoryService
      .getAllMappedQuestionForSubCategory({ QuestionMappingId })
      .subscribe((data: MappedQuestion) => {
        if (!!data && data.Questions.length > 0) {
          this.mappedQuestions = data;
          this.generateQuesOptionMapData(data);
        } else {
          this.isShowSubCatgoryOptionBackButton = false;
          this.showSubCategoryOptions();
        }
      });
  }

  private showSubCategoryOptions() {
    this.isShowSubCatgoryOption = true;
    this.subCategoryService.setLastStepSavedQuestionData = this.customerResponses;
    this.showSubCategoryOption.emit({ isShowSubCatgoryOption: this.isShowSubCatgoryOption, isShowSubCatgoryOptionBackButton: this.isShowSubCatgoryOptionBackButton, subCategoryCustomerResponses: this.customerResponses });
  }

  generateQuesOptionMapData(data: MappedQuestion) {
    const Questions = data['Questions'];
    const Options = data['Options'];

    if (
      (Questions === null || Questions === undefined || Questions.length === 0) &&
      (Options === null || Options === undefined || Options.length === 0)
    ) {
      return;
    }

    const questions = Questions.sort((a, b) => a.SlNo - b.SlNo);
    this.questions = [...questions];
    questions.forEach(x => {
      const qustions = Options.sort((a, b) => a.SlNo - b.SlNo).filter(y => y.ServiceQuestionId === x.ServiceQuestionId);
      this.preparedMappedQuestions.set(x.ServiceQuestionId, qustions);
    });

    this.showingQuestionAndOptions(this.currentStep);
  }

  private showingQuestionAndOptions(currentStep) {
    const ques: Question = this.getQuestion(currentStep) as Question;
    if (ques === null || ques === undefined) {
      return;
    }

    const options = this.preparedMappedQuestions.get(ques.ServiceQuestionId);

    this.questionAndOptions = {
      Question: ques,
      Options: options,
      CustomerResponse: Object.assign({}, this.getCurrentStepCustomerResponse(ques.ServiceQuestionId))
    };
  }

  getQuestion(slNo) {
    const question = this.questions.find(x => x.SlNo === slNo);
    return question;
  }

  onNextBtnClicked(questionAndOptions: any) {
    if (questionAndOptions.CustomerResponse.ServiceQResponseId === -1) {
      alert('Please select one item');
      return;
    }

    if (this.currentStep < this.preparedMappedQuestions.size) {
      this.currentStep = ++this.currentStep;
      this.storeResponse(questionAndOptions.Question, questionAndOptions.CustomerResponse);

      this.resetquestionAndOptions();
      this.showingQuestionAndOptions(this.currentStep);
    } else if (this.currentStep === this.preparedMappedQuestions.size) {
      this.storeResponse(questionAndOptions.Question, questionAndOptions.CustomerResponse);
      // this.isShowSubCatgoryOption = true;
      // this.subCategoryService.setLastStepSavedQuestionData = this.customerResponses;
      // this.showSubCategoryOption.emit(this.isShowSubCatgoryOption);
      this.showSubCategoryOptions();
    }
  }

  onBackButtonClicked() {
    this.currentStep = --this.currentStep;
    this.resetquestionAndOptions();
    this.showingQuestionAndOptions(this.currentStep);
  }

  resetquestionAndOptions() {
    this.questionAndOptions = new QuestionAndOption();
  }

  storeResponse(question, customerResponse) {
    const res = Object.assign({}, ...customerResponse);
    this.customerResponses.set(question.ServiceQuestionId, res);
  }

  getCurrentStepCustomerResponse(questionId) {
    let response: CustomerResponse = new CustomerResponse();
    response = this.customerResponses.get(questionId);
    if (response === null || response === undefined) {
      response = new CustomerResponse();
      response = {
        ServiceQResponseId: -1,
        ResponseText: '',
        ServiceQuestionId: questionId
      };
    }
    return response;
  }

  ngOnDestroy() {
    this.subscriptionShowLastStepData.unsubscribe();
  }
}

import {
  Option,
  QuestionAndAnswer,
  SubCategoryOptionQuestionAndAnswer,
  CartDetailsInfo
} from './../../models/mapped-question';
import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { SubCategoryService } from '../../service/sub-category.service';
import { SubCategory, SubCategoryOption, DiscountCalculateData } from '../../models/sub-category.model';
import { BsModalRef } from 'ngx-bootstrap';
import {
  QuestionAndOption,
  CustomerResponse,
  Question,
  MappedQuestion,
  TaskInstruction
} from '../../models/mapped-question';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CartOrderData, ServiceOptionList, ModelQuestion } from '../../models/place-order.model';

import * as moment from 'moment';
import { StoredDataTypes } from '../../service/stored-data-types.enum';
import { CartStorageService } from '../../service/cart-storage.service';
import { ScrollSpyService } from 'ngx-scrollspy';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sub-category-option',
  templateUrl: './sub-category-option.component.html',
  styleUrls: ['./sub-category-option.component.scss']
})
export class SubCategoryOptionComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  subCategory: SubCategory;
  @Input()
  serviceData: any;

  @Input()
  subCategoryCustomerResponse: QuestionAndAnswer; // sub category customer choices

  @Input()
  showSubCatgoryOptionBackButton: boolean;
  @Input()
  orderPlacementStep: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Output()
  showSubCategoryQuestion: EventEmitter<any> = new EventEmitter();

  subCategoryOptionCaption = '';
  subCategoryOptionQuestionCaption = '';

  subCategoryOptionParams = {
    // AreaId: 1,
    // ServiceCategoryId: 2,
    // SubCategoryId: 1
  };

  mappedQuestions: MappedQuestion;
  preparedMappedQuestions = new Map();
  questions: Question[] = [];
  questionAndOptions: QuestionAndOption = new QuestionAndOption();
  allSubCategoryOptions: SubCategory[] = [];
  SubCategoryOption: SubCategoryOption;
  currentStep = 1;
  customerResponses = new Map();
  customerTaskInstructions = new Map();
  isShowSubCatgoryOption = true;
  isFinalStep = false;

  currentProcessingQuestionMappingId: number;
  currentProcessingSubCategoryOptionId: number;
  currentProcessingSubCategoryOption: SubCategoryOption;
  preparedFormDatas = [];
  taskInstruction = '';

  showSchedule = false;

  isShowContinueButton = false;

  storedShowSubCatgoryOptionBackButton;

  // subCategoryOptionCustomerResponse: SubCategoryOptionQuestionAndAnswer[] = [];
  subCategoryOptionCustomerResponse: Map<number, SubCategoryOptionQuestionAndAnswer> = new Map<
    number,
    SubCategoryOptionQuestionAndAnswer
  >();

  // subCategoryOptionCustomerResponse = new Map();
  scrollPosition = 0;
  scrollSpySubscription: Subscription;
  allSubCategoryOptionSubscription: Subscription;
  discountCalculatedData: DiscountCalculateData;
  showDiscountedCalculationSection = false;

  constructor(
    public bsModalRef: BsModalRef,
    private subCategoryService: SubCategoryService,
    private activatedRoute: ActivatedRoute,
    private cartStorageService: CartStorageService,
    private scrollSpyService: ScrollSpyService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.subCategoryOptionCaption = this.subCategory.Name;

    this.currentProcessingQuestionMappingId = -1;
    this.currentProcessingSubCategoryOptionId = -1;
    // this.getAllSubCategoryOption();
    this.SubCategoryOption = new SubCategoryOption();
    this.SubCategoryOption.Quantity = 0;

    this.initialData();
  }

  initialData() {
    if (!!this.serviceData && !!this.subCategory) {
      this.subCategoryOptionParams = {
        AreaId: this.serviceData.AreaId,
        ServiceCategoryId: this.serviceData.ServiceCategoryId,
        SubCategoryId: this.subCategory.SubCategoryId
      };
      this.getAllSubCategoryOption();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.storedShowSubCatgoryOptionBackButton = Object.assign(
        {},
        { showSubCatgoryOptionBackButton: this.showSubCatgoryOptionBackButton }
      );
    }, 1000);

    this.saveScrollPosition();
  }

  saveScrollPosition() {
    this.scrollSpySubscription = this.scrollSpyService
      .getObservable('subCategoryOptionScrollSpy')
      .subscribe((e: any) => {
        // this.cartStorageService.getCartData(StoredDataTypes.OptionScrollPosition).subscribe(data => {
        //   e.target.scrollTop = +data;
        // });
        if (this.currentStep === 1) {
          this.cartStorageService
            .storeCartData(StoredDataTypes.OptionScrollPosition, e.target.scrollTop)
            .subscribe(() => {});
        }
      });
  }

  getAllSubCategoryOption() {
    this.allSubCategoryOptionSubscription = this.subCategoryService
      .getAllSubCategoryOption(this.subCategoryOptionParams)
      .subscribe((data: SubCategory[]) => {
        this.allSubCategoryOptions = data.map(x =>
          Object.assign(
            {},
            { ...x },
            {
              SubCategoryOption: {
                Quantity: 0
              }
            }
          )
        );
        this.currentStep = 1;
      });
  }

  onAddCartClicked(option: SubCategory) {
    const {
      SubCategoryOption: subCategoryOption,
      QuestionMappingId: questionMappingId,
      SubCategoryOptionId,
      Price
    } = option;

    this.showSubCatgoryOptionBackButton = true;

    this.isShowContinueButton = false;
    this.isFinalStep = false;
    this.currentStep = 2;
    this.isShowSubCatgoryOption = false;

    subCategoryOption.Quantity = 1;
    subCategoryOption.Price = Price;
    subCategoryOption.SubCategoryOptionId = SubCategoryOptionId;

    this.currentProcessingQuestionMappingId = questionMappingId;
    this.currentProcessingSubCategoryOptionId = SubCategoryOptionId;
    this.currentProcessingSubCategoryOption = subCategoryOption;

    this.subCategoryOptionQuestionCaption = option.Name;

    this.taskInstruction = '';
    this.preparedFormDatas = [];
    this.getAllMappedQestion(questionMappingId);
  }

  onMinusCartClicked(questionAndOptions, data) {
    // if (data.Quantity === 0) {
    //   return;
    // }
    // data.Quantity -= 1;

    if (data.SubCategoryOption.Quantity === 0) {
      return;
    }
    data.SubCategoryOption.Quantity -= 1;

    setTimeout(() => {
      this.populateDiscountedPrice();
    }, 100);

    if (data.SubCategoryOption.Quantity === 0) {
      const { QuestionMappingId } = questionAndOptions;

      // Remove customer response
      const quesResponse = this.customerResponses.get(QuestionMappingId);
      // tslint:disable-next-line:no-unused-expression
      quesResponse && this.customerResponses.delete(QuestionMappingId);

      // Remove task instruction
      const taskInstructionExist = this.customerTaskInstructions.get(this.currentProcessingSubCategoryOptionId);
      // tslint:disable-next-line:no-unused-expression
      taskInstructionExist && this.customerTaskInstructions.delete(this.currentProcessingSubCategoryOptionId);

      if (this.subCategoryOptionCustomerResponse.has(this.currentProcessingSubCategoryOptionId)) {
        this.subCategoryOptionCustomerResponse.delete(this.currentProcessingSubCategoryOptionId);
      }
    }
  }

  onPlusCartClicked(data) {
    data.Quantity += 1;

    setTimeout(() => {
      this.populateDiscountedPrice();
    }, 100);
  }

  private showingQuestionAndOptions(QuestionMappingId, currentStep) {
    if (!this.isShowSubCatgoryOption && currentStep > 1) {
      --currentStep;
    }

    const ques: Question = this.getQuestion(currentStep) as Question;
    if (!ques) {
      return;
    }
    const options = this.preparedMappedQuestions.get(ques.ServiceQuestionId);

    this.questionAndOptions = {
      QuestionMappingId,
      Question: ques,
      Options: options,
      // CustomerResponse: Object.assign(
      //   {},
      //   this.getCurrentStepCustomerResponse(QuestionMappingId, ques.ServiceQuestionId)
      // )
      CustomerResponse: {
        ServiceQResponseId: -1,
        ResponseText: '',
        ServiceQuestionId: ques.ServiceQuestionId
      }
    };
  }

  getQuestion(slNo) {
    const question = this.questions.find(x => x.SlNo === slNo);
    return question;
  }

  onNextBtnClicked(questionAndOptions: any) {
    if (this.currentStep > 1) {
      this.scrollPosition = 0;
    }

    if (
      questionAndOptions.QuestionMappingId > 0 &&
      questionAndOptions.Options.length > 0 &&
      questionAndOptions.CustomerResponse.ServiceQResponseId === -1
    ) {
      alert('Please select one item');
      return;
    }
    this.showSubCatgoryOptionBackButton = true;

    if (this.isFinalStep) {
      this.storeTaskInstruction();
      // this.setFirstStepOptionsData(this.currentProcessingQuestionMappingId);

      // Not showing backback if mapping id =0
      this.showSubCatgoryOptionBackButton =
        this.storedShowSubCatgoryOptionBackButton &&
        this.storedShowSubCatgoryOptionBackButton.showSubCatgoryOptionBackButton;

      this.currentStep = 1;
      this.isShowSubCatgoryOption = true;
      this.isFinalStep = false;
      this.setScrollPosition();

      // Store Response data
      this.storeTemporaryOptionData();

      setTimeout(() => {
        this.populateDiscountedPrice();
      }, 100);

      return;
    }

    if (
      questionAndOptions.QuestionMappingId <= 0 &&
      questionAndOptions.Options.length === 0 &&
      this.preparedMappedQuestions.size === 0
    ) {
      this.isFinalStep = true;
      return;
    }

    if (this.currentStep - 1 < this.preparedMappedQuestions.size) {
      this.currentStep = ++this.currentStep;
      this.storeResponse(
        questionAndOptions.QuestionMappingId,
        questionAndOptions.Question,
        questionAndOptions.CustomerResponse
      );

      // Store Response data
      this.storeTemporaryOptionData();

      this.resetquestionAndOptions();
      this.showingQuestionAndOptions(questionAndOptions.QuestionMappingId, this.currentStep);
    } else if (this.currentStep - 1 === this.preparedMappedQuestions.size) {
      this.storeResponse(
        questionAndOptions.QuestionMappingId,
        questionAndOptions.Question,
        questionAndOptions.CustomerResponse
      );
      // Store Response data
      this.storeTemporaryOptionData();

      this.isFinalStep = true;
    }
  }

  /**
   * store temporary cart data
   */
  private storeTemporaryOptionData() {
    const _SubCategoryOptionQuestionAndAnswer: SubCategoryOptionQuestionAndAnswer = new SubCategoryOptionQuestionAndAnswer();
    _SubCategoryOptionQuestionAndAnswer.SubCategoryOptionId = this.currentProcessingSubCategoryOptionId;
    _SubCategoryOptionQuestionAndAnswer.QuestionMappingId = this.currentProcessingQuestionMappingId;

    if (this.customerTaskInstructions.has(this.currentProcessingSubCategoryOptionId)) {
      _SubCategoryOptionQuestionAndAnswer.TaskInstruction = this.customerTaskInstructions.get(
        this.currentProcessingSubCategoryOptionId
      );
    } else {
      _SubCategoryOptionQuestionAndAnswer.TaskInstruction = {
        Files: [],
        Instruction: '',
        SubCategoryOptionId: this.currentProcessingSubCategoryOptionId
      };
    }

    if (this.customerResponses.has(this.currentProcessingQuestionMappingId)) {
      const _cr: Map<any, any> = this.customerResponses.get(this.currentProcessingQuestionMappingId);
      if (_cr) {
        const keys = Array.from(_cr.keys());
        const _tvalue = _cr.get(keys[0]);
        _SubCategoryOptionQuestionAndAnswer.Answers = [_tvalue];
      }
    }

    // console.log(
    //   'TCL: SubCategoryOptionComponent -> onNextBtnClicked -> _SubCategoryOptionQuestionAndAnswer',
    //   _SubCategoryOptionQuestionAndAnswer
    // );

    this.subCategoryOptionCustomerResponse.set(
      this.currentProcessingSubCategoryOptionId,
      _SubCategoryOptionQuestionAndAnswer
    );
  }

  onBackButtonClicked(questionAndOptions) {
    if (this.currentStep === 2 && !this.isShowSubCatgoryOption) {
      // this.currentStep = 1;
      // this.isShowSubCatgoryOption = true;

      // this.isFinalStep = false;

      // this.resetquestionAndOptions();
      // this.showingQuestionAndOptions(questionAndOptions.QuestionMappingId, this.currentStep);

      // Not showing backback if mapping id =0
      this.showSubCatgoryOptionBackButton =
        this.storedShowSubCatgoryOptionBackButton &&
        this.storedShowSubCatgoryOptionBackButton.showSubCatgoryOptionBackButton;

      this.setFirstStepOptionsData(questionAndOptions.QuestionMappingId);

      this.setScrollPosition();
      return;
    } else if (this.currentStep === 1 && this.isShowSubCatgoryOption) {
      this.showSubCategoryQuestion.emit(false);
      return;
    }
    this.currentStep = --this.currentStep;
    this.resetquestionAndOptions();
    this.showingQuestionAndOptions(questionAndOptions.QuestionMappingId, this.currentStep);
  }

  private setScrollPosition() {
    this.cartStorageService.getCartData(StoredDataTypes.OptionScrollPosition).subscribe(data => {
      this.scrollPosition = +data;
    });
  }

  private setFirstStepOptionsData(QuestionMappingId: number) {
    if (QuestionMappingId > 0) {
      if (!this.customerResponses.has(QuestionMappingId)) {
        this.currentProcessingSubCategoryOption.Quantity = 0;
      }
    }

    this.currentStep = 1;
    this.isShowSubCatgoryOption = true;
    this.isFinalStep = false;
    this.resetquestionAndOptions();
    this.showingQuestionAndOptions(QuestionMappingId, this.currentStep);
  }

  resetquestionAndOptions() {
    this.questionAndOptions = new QuestionAndOption();
  }

  storeResponse(QuestionMappingId: number, question, customerResponse) {
    const res = Object.assign({}, ...customerResponse);
    const quesRes = new Map();
    quesRes.set(question.ServiceQuestionId, res);
    // this.customerResponses.set(question.ServiceQuestionId, res);
    this.customerResponses.set(QuestionMappingId, quesRes);
  }

  getCurrentStepCustomerResponse(QuestionMappingId, questionId) {
    let response: CustomerResponse = new CustomerResponse();
    const quesResponse = this.customerResponses.get(QuestionMappingId);
    // response = this.customerResponses.get(questionId);
    response = quesResponse && quesResponse.get(questionId);

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

  // Continue functionality
  onContinueClicked() {
    // this.showSchedule = true;

    // console.log(
    //   'TCL: SubCategoryOptionComponent -> onContinueClicked -> this.subCategoryOptionCustomerResponse',
    //   this.subCategoryOptionCustomerResponse
    // );

    // console.log(
    //   'TCL: SubCategoryOptionComponent -> onContinueClicked -> this.subcategorycustomerresponse',
    //   this.subCategoryCustomerResponse
    // );

    // console.log(
    //   'TCL: SubCategoryOptionComponent -> onContinueClicked -> this.allSubCategoryOptions',
    //   this.allSubCategoryOptions
    // );

    // console.log(
    //   'TCL: SubCategoryOptionComponent -> onContinueClicked -> this.customerTaskInstructions',
    //   this.customerTaskInstructions
    // );
    // console.log(
    //   'TCL: SubCategoryOptionComponent -> onContinueClicked -> this.customerResponses',
    //   this.customerResponses
    // );

    // this.getServiceOptionList();
    this.storeCartDataInCookies();
    this.isShowSubCatgoryOption = false;

    this.orderPlacementStep.next(true);
  }

  getAllMappedQestion(QuestionMappingId) {
    this.subCategoryService
      .getAllMappedQuestionForSubCategory({ QuestionMappingId })
      .subscribe((data: MappedQuestion) => {
        this.mappedQuestions = data; // for future use
        this.generateQuesOptionMapData(data);
      });
  }

  generateQuesOptionMapData(data: MappedQuestion) {
    const Questions = data['Questions'];
    const Options = data['Options'];
    this.preparedMappedQuestions.clear(); // reset the previouse mapped question

    if (
      (Questions === null || Questions === undefined || Questions.length === 0) &&
      (Options === null || Options === undefined || Options.length === 0)
    ) {
      this.resetQuestionAndOptions();
      this.isFinalStep = true;
      return;
    }

    const questions = Questions.sort((a, b) => a.SlNo - b.SlNo);
    this.questions = [...questions];
    questions.forEach(x => {
      const qustions = Options.sort((a, b) => a.SlNo - b.SlNo).filter(y => y.ServiceQuestionId === x.ServiceQuestionId);
      this.preparedMappedQuestions.set(x.ServiceQuestionId, qustions);
    });

    this.showingQuestionAndOptions(data.QuestionMappingId, this.currentStep);
  }

  get showContinueButton() {
    const isShowContinueButton = this.allSubCategoryOptions.some(x => x.SubCategoryOption.Quantity > 0);
    return isShowContinueButton;
  }

  resetQuestionAndOptions() {
    this.questionAndOptions = {
      QuestionMappingId: -1,
      Question: {
        ...new Question(),
        QName: 'No more questions, select Next'
      },
      Options: [],
      CustomerResponse: {
        ServiceQResponseId: -1,
        ResponseText: '',
        ServiceQuestionId: -1
      }
    };
  }

  onChangeHandler(files: any) {
    // const preparedFormDatas = [];

    // this.preparedFormDatas = files.map(file => {
    //   const formData = new FormData();
    //   formData.append('file', file.file, file.file.name);
    //   return formData;
    // });
    this.preparedFormDatas = files;
  }

  storeTaskInstruction() {
    const taskInstruction = new TaskInstruction();
    taskInstruction.Instruction = this.taskInstruction;
    taskInstruction.Files = this.preparedFormDatas;
    taskInstruction.SubCategoryOptionId = this.currentProcessingSubCategoryOptionId;

    // if (this.customerResponses.has(this.currentProcessingQuestionMappingId)) {
    //   const quesResponse = this.customerResponses.get(this.currentProcessingQuestionMappingId);
    //   quesResponse.set('taskInstruction', {taskInstruction: taskInstruction});
    // } else {
    //   this.customerResponses.set(this.currentProcessingQuestionMappingId, {taskInstruction: taskInstruction});
    // }

    // if (this.customerTaskInstructions.has(this.currentProcessingQuestionMappingId)) {
    //   const quesResponse = this.customerTaskInstructions.get(this.currentProcessingQuestionMappingId);
    //   quesResponse.set('taskInstruction', {taskInstruction: taskInstruction});
    // } else {
    //   this.customerTaskInstructions.set(this.currentProcessingQuestionMappingId, {taskInstruction: taskInstruction});
    // }

    // this.customerTaskInstructions.set(this.currentProcessingSubCategoryOptionId, { taskInstruction: taskInstruction });
    this.customerTaskInstructions.set(this.currentProcessingSubCategoryOptionId, taskInstruction);
  }

  storeCartDataInCookies() {
    const cartOrderData = new CartOrderData();
    const serviceOptionList = this.getServiceOptionList();

    cartOrderData.CartDate = moment().format('YYYY-MM-DD');
    cartOrderData.OrderAreaId = this.serviceData.AreaId;
    cartOrderData.SubcategoryId = this.subCategory.SubCategoryId;
    cartOrderData.InnerCategoryId = this.subCategory.InnerCategoryId;
    cartOrderData.Quantity = serviceOptionList.reduce((prev, cur) => {
      return prev + cur.Quantity;
    }, 0);

    cartOrderData.TotalPrice = serviceOptionList.reduce((prev, cur) => {
      return prev + cur.Quantity * cur.UnitPrice;
    }, 0);

    cartOrderData.ServiceOptionList = serviceOptionList;

    // console.log('TCL: SubCategoryOptionComponent -> getServiceOptionList -> cartOrderData', cartOrderData);

    const cartDetailsInfo = {
      Id: this.cartStorageService.getUniqueId(),
      InnerCategoryId: this.subCategory.InnerCategoryId,
      SubcategoryId: this.subCategory.SubCategoryId,
      SubCategoryResponses: this.subCategoryCustomerResponse,
      SubCategroy: this.subCategory,
      ServiceSelectionData: this.serviceData,
      CartOrderData: cartOrderData
    };

    this.cartStorageService.storeCartData(StoredDataTypes.CurrentProcessingCart, cartDetailsInfo).subscribe(() => {
      // this.populateDiscountedPrice(cartOrderData);
    });

    const tt = this.cartStorageService.getCartData<any[]>(StoredDataTypes.AllCartInfo).subscribe(data => {
      if (!!data) {
        const temp = [...data, cartDetailsInfo];
        this.cartStorageService.storeCartData(StoredDataTypes.AllCartInfo, temp).subscribe(() => {
          this.cartStorageService.sendAddCartNotification();
          this.toastr.success('Item successfully added to cart', 'Success!');
        });
      } else {
        this.cartStorageService.storeCartData(StoredDataTypes.AllCartInfo, [cartDetailsInfo]).subscribe(() => {
          this.toastr.success('Item successfully added to cart', 'Success!');
          this.cartStorageService.sendAddCartNotification();
        });
      }
    });
  }

  getServiceOptionList() {
    const serviceOptionList: ServiceOptionList[] = [];
    this.subCategoryOptionCustomerResponse.forEach((value, key) => {
      const { TaskInstruction: taskInstruction, QuestionMappingId, Answers } = value;
      const { Instruction, Files } = taskInstruction;
      const _serviceOption = new ServiceOptionList();
      const item = this.getSubCategoryOptionByOptionId(key);
      _serviceOption.SubcategoryOptionId = key;
      _serviceOption.Quantity = item.SubCategoryOption.Quantity;
      _serviceOption.UnitPrice = item.Price;
      _serviceOption.OrderInstructionText = Instruction;
      _serviceOption.ServiceType = item.Name;
      // _serviceOption.ModelQuestion = this.getModelQuestion(QuestionMappingId, Answers);
      _serviceOption.ModelQuestion = [
        ...this.getModelQuestion(QuestionMappingId, Answers),
        ...this.getSubCategoryModelQuestions()
      ];

      _serviceOption.Files = Files;

      serviceOptionList.push(_serviceOption);
    });
    console.log('TCL: SubCategoryOptionComponent -> getServiceOptionList -> serviceOptionList', serviceOptionList);

    return serviceOptionList;
  }

  getModelQuestion(QuestionMappingId, Answers) {
    const _ModelQuestion = new ModelQuestion();
    _ModelQuestion.QuestionMappingId = QuestionMappingId;
    _ModelQuestion.Options = Answers;
    return [_ModelQuestion];

    // const _options = [];
    // Answers.forEach(item => {
    //   // const {ServiceQResponseId, ResponseText, ServiceQuestionId} = item;
    //   _options.push(item);
    // })
  }

  getSubCategoryOptionByOptionId(optionId: number) {
    const optionItem = this.allSubCategoryOptions.find(x => x.SubCategoryOptionId === optionId);
    return optionItem;
  }

  getSubCategoryModelQuestions() {
    this.subCategoryCustomerResponse;
    const _ModelQuestion = new ModelQuestion();
    _ModelQuestion.QuestionMappingId = this.subCategoryCustomerResponse.QuestionMappingId;
    _ModelQuestion.Options = this.subCategoryCustomerResponse.Answers as Array<Option>;
    return [_ModelQuestion];
  }

  ngOnDestroy() {
    this.scrollSpySubscription && this.scrollSpySubscription.unsubscribe();
    this.allSubCategoryOptionSubscription && this.allSubCategoryOptionSubscription.unsubscribe();
  }

  // populateDiscountedPrice(cartOrderData: CartOrderData) {
  //   const serviceOptionList = this.getServiceOptionList();


  //   const Quantity = serviceOptionList.reduce((prev, cur) => {
  //     return prev + cur.Quantity;
  //   }, 0);

  //   const TotalPrice = serviceOptionList.reduce((prev, cur) => {
  //     return prev + cur.Quantity * cur.UnitPrice;
  //   }, 0);

  //   this.showDiscountedCalculationSection = cartOrderData.Quantity > 1;
  //   const discountCalculateData = new  DiscountCalculateData();
  //   const price = (cartOrderData.TotalPrice * this.getPercentage(cartOrderData.Quantity)) / 100;
  //   const afterDisPrice = cartOrderData.TotalPrice - price;
  //   discountCalculateData.TotalService = cartOrderData.Quantity;
  //   discountCalculateData.TotalAmount = cartOrderData.TotalPrice;
  //   discountCalculateData.TotalDiscountedAmount = afterDisPrice;
  //   discountCalculateData.TotalSavePercentage = this.getPercentage(cartOrderData.Quantity);
  //   this.discountCalculatedData = discountCalculateData;
  // }
  populateDiscountedPrice() {
    const serviceOptionList = this.getServiceOptionList();

    if (serviceOptionList ===  null || serviceOptionList === undefined || serviceOptionList.length === 0) {
      return;
    }

    const Quantity = serviceOptionList.reduce((prev, cur) => {
      return prev + cur.Quantity;
    }, 0);

    const TotalPrice = serviceOptionList.reduce((prev, cur) => {
      return prev + cur.Quantity * cur.UnitPrice;
    }, 0);

    this.showDiscountedCalculationSection = Quantity > 1;
    const discountCalculateData = new  DiscountCalculateData();
    const price = (TotalPrice * this.getPercentage(Quantity)) / 100;
    const afterDisPrice = TotalPrice - price;
    discountCalculateData.TotalService = Quantity;
    discountCalculateData.TotalAmount = TotalPrice;
    discountCalculateData.TotalDiscountedAmount = afterDisPrice;
    discountCalculateData.TotalSavePercentage = this.getPercentage(Quantity);
    this.discountCalculatedData = discountCalculateData;
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

  // afterDiscountPrice(cartOrderData: CartOrderData) {
  //   const price = (cartOrderData.TotalPrice * this.getPercentage(cartOrderData.Quantity)) / 100;

  //   const afterDisPrice = cartOrderData.TotalPrice - price;
  // }
}

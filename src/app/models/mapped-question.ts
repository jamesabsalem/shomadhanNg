import { SubCategory } from './sub-category.model';
import { CartOrderData } from './place-order.model';

export class Question {
  ServiceQuestionId: number;
  SlNo: number;
  SectionTypeId: number;
  QName: string;
  QNameBn: string;
  IsAnswared: boolean;
  IsMultiple: boolean;
  IsAdditionalField: boolean;
  QHints: string;
  QNote: string;
}

export class Option {
  ServiceQuestionId: number;
  ServiceQResponseId: number;
  SlNo: number;
  QResponseName: string;
  QResponseNameBn: string;
  ResponseText: string;
  SetupPrice: number;
  SectionTypeId: number;
}

export class MappedQuestion {
  QuestionMappingId: number;
  UserId: number;
  Questions: Question[];
  Options: Option[];
}

export class QuestionAndOption {
  QuestionMappingId?: number;
  Question: Question;
  Options: Option[];
  CustomerResponse: CustomerResponse;
}

export class CustomerResponse {
  ServiceQResponseId: number;
  ResponseText: string;
  ServiceQuestionId: number;
}

export class TaskInstruction {
  SubCategoryOptionId: number;
  Instruction: string;
  // Files: FormData[];
  Files: any[];
}

class QAnswer {
  QuestionMappingId: number;
  Answers: CustomerResponse[];
}

export class QuestionAndAnswer {
  QuestionMappingId?: number;
  Answers?: CustomerResponse[];
}

export class SubCategoryOptionQuestionAndAnswer extends QuestionAndAnswer {
  SubCategoryOptionId: number;
  TaskInstruction: TaskInstruction;

  constructor() {
    super();
  }
}

export class CartDetailsInfo {
  Id: string;
  SubCategoryResponses: QuestionAndAnswer;
  SubCategroy: SubCategory;
  ServiceSelectionData: any;
  CartOrderData: CartOrderData;
  InnerCategoryId: number;
  SubcategoryId: number;
}

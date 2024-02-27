export class PlaceOrder {
  CartOrderData: CartOrderData;
  CompanyId: number;
  CompanyName: string;
  ModelScheduleTime: ModelScheduleTime;
  ScheduleDate: string;
  ServiceTypeId: number;
  TempUserDeliveryInfo: TempUserDeliveryInfo;
  UserDetail: UserDetail;
}

export class Option {
  ResponseText: string;
  ServiceQResponseId?: number;
  ServiceQuestionId: number;
}

export class ModelQuestion {
  QuestionMappingId: number;
  Options: Option[];
}

export class ServiceOptionList {
  SubcategoryOptionId: number;
  SubcategoryOptionDetailId: number;
  Quantity: number;
  UnitPrice: number;
  UnitDiscount: number;
  OrderInstructionText: string;
  PromoCode: string;
  ModelQuestion: ModelQuestion[];
  ServiceType?: string;
  // Files?: FormData[];
  Files?: any[];
}

export class CartOrderData {
  CartDate: string;
  ScheduleDate: string;
  OrderAreaId: number;
  InnerCategoryId: number;
  SubcategoryId: number;
  Quantity: number;
  TotalDiscount: number;
  TotalPrice: number;
  ServiceOptionList: ServiceOptionList[];
}

export class ModelScheduleTime {
  ServiceScheduleTimeId: number;
  TimeSlot: string;
}

export class TempUserDeliveryInfo {
  Address: string;
  DeliveryName: string;
  Mobile: string;
}

export class UserDetail {
  Address1: string;
  Address2: string;
  AreaId: number;
  Code: string;
  Email: string;
  FBId: string;
  FullName: string;
  GPId: string;
  JoiningDate: string;
  Mobile: string;
  ProfilePic: string;
  UserId: number;
  UserName: string;
}

export class DeliveryInfo extends TempUserDeliveryInfo {
  Email?: string;

  constructor() {
    super();
  }
}

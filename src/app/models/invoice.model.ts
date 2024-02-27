export class OrderDetailList {
  OrderPlaceDetailId: number;
  OrderPlaceDateTime?: any;
  SubcategoryName: string;
  SubcategoryOptionId: number;
  SubcategoryOptionName: string;
  UnitOrderQty: number;
  UnitOrderPrice: number;
  UnitOrderDiscoutPrice: number;
  PromoDiscount: number;
  QuestionAnswerList?: any;
}

export class DeliveryUserDetail {
  DeliveryName: string;
  DeliveryMobile: string;
  DeliveryAddress: string;
  OrderStatusId: number;
  StatusName: string;
  Email: string;
}

export class OrderSummery {
  OrderId: string;
  InvoiceBillNo: number;
  OrderStatusId: number;
  OrderPlaceDateTime?: any;
  InnerCategoryName: string;
  TotalOrderQty: number;
  ServiceScheduleDate: string;
  TimeSlot: string;
  TotalServiceCharge: number;
  RefImg: string;
  ProviderName: string;
}

export class Invoice {
  OrderDetailList: OrderDetailList[];
  DeliveryUserDetail: DeliveryUserDetail;
  ExpertDetail?: any;
  OrderSummery: OrderSummery;
}

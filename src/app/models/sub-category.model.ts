export class SubCategory {
  ServiceCategoryId: number;
  InnerCategoryId: number;
  SubCategoryId: number;
  SubCategoryOptionId: number;
  SubCategoryOptionDetailId: number;
  SerialNo: number;
  Name: string;
  RefImg: string;
  BannerImg: string;
  SpecialText: string;
  CaptionText: string;
  Price: number;
  IsActive: boolean;
  IsHomeVisible: boolean;
  IsInnerCat: boolean;
  IsSubCat: boolean;
  IsSubCatOption: boolean;
  IsSubCatOptionDetail: boolean;
  QuestionMappingId: number;
  SubCategoryOption?: SubCategoryOption
}

export class SubCategoryOption {
  SubCategoryOptionId: number;
  Quantity: number;
  Price: number;
}

export class DiscountCalculateData {
  TotalService: number;
  TotalAmount: number;
  TotalDiscountedAmount: number;
  TotalSavePercentage: number;
}

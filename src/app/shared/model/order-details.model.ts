export interface OrderDetails {
    OrderSummary: OrderSummary;
    ExpertDetail: ExpertDetail;
    OrderDetailList: OrderDetailList[];
}

export interface OrderDetailList {
    OrderPlaceDateTime: string;
    SubcategoryName: string;
    SubcategoryOptionName: string;
    UnitOrderQty: number;
    UnitOrderPrice: number;
    UnitOrderDiscoutPrice: number;
    PromoDiscount: number;
}

export interface ExpertDetail {
    ExpertId: number;
    FullName: string;
    CompanyName: string;
    ExpertRating: number;
    Mobile: string;
    ProfilePic: string;
}

export interface OrderSummary {
    OrderPlaceDateTime: string;
    InnerCategoryName: string;
    TotalOrderQty: number;
    ServiceScheduleDate: string;
    TimeSlot: string;
    TotalServiceCharge: number;
    RefImg: string;
}

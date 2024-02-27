export interface UserOrder {
    OrderId: string;
    ServiceName: string;
    RefImg: string;
    StatusName: string;
    OrderStatusId: number;
    IsCartAdded: boolean;
    IsOrderPlaced: boolean;
    IsPaymentDone: boolean;
    ServiceScheduleDate: string;
    OrderPlaceDateTime: string;
    CartAddDateTime: string;
    TimeSlot: string;
    ServiceScheduleTimeId: number;
    Mobile: string;
    FullName: string;
    ProfilePic: string;
    ExpertRating: number;
    CompanyName: string;
    ServiceCompanyId: number;
    ServiceCategoryId: number;
    ServicePartnerId: number;
    SubCategoryOptionDetailForOrderId: number;
    TotalOrderPrice: number;
}

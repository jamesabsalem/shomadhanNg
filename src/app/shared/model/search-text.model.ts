// export interface SearchText {
//     ServiceCategoryId: number;
//     InnerCategoryId: number;
//     SubCategoryId: number;
//     SubCategoryOptionId: number;
//     SubCategoryOptionDetailId: number;
//     AssingedText: string;
//     ImgSrc: string;
//     AssingedAreaId: number;
// }

export interface SearchText {
    ServiceCategoryId: number;
    InnerCategoryId: number;
    SubCategoryId: number;
    SubCategoryOptionId: number;
    SubCategoryOptionDetailId: number;
    Name: string;
    RefImg: string;
    AssingedAreaId: number;
    IsActive: number;
    IsHomeVisible: number;
    IsInnerCat: boolean;
    IsSubCat: boolean;
    IsSubCatOption: boolean;
    IsSubCatOptionDetail: boolean;
    SerialNo: number;
    BannerImg: string;
    SpecialText: string;
    CaptionText: string;
    Price: number;
    QuestionMappingId: number;
}

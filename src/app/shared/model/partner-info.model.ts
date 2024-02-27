export interface PartnerInfo {
    CompanyName: string;
    Location: string;
    ExperienceYear: number;
    CompanyAbout: string;
    Rating: number;
    CompanyLogoUrl: string;
    AvaibleResource: number;
    JobServed: number;
    ProfileCompletionPercentage: number;
    ServiceDayTime: any[];
    Services: Service[];
    Experts: Expert[];
}

export interface Expert {
    FullName: string;
    Mobile: string;
    CompanyName: string;
    ExpertRating: number;
    ProfilePic: string;
}

export interface Service {
    ServiceName: string;
    ImageUrl: string;
    BannerUrl: string;
}

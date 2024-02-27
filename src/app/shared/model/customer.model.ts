export class CustomerInfo {
    Status: string;
    ResponseMsg: string;
    Data: Customer;
}

export class Customer {
    UserId?: number;
    UserName?: string;
    FullName?: string;
    Code?: string;
    Mobile: string;
    Email?: string;
    JoiningDate?: string;
    DateOfBirth?: string;
    AreaId?: number;
    Address1?: string;
    Address2?: string;
    ProfilePic?: string;
    FBId?: string;
    GPId?: string;
    Password: string;
    Gender?: string;
}

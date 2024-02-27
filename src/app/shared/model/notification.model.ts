export interface Notification {
    NotificationId: number;
    NotificationTypeId: number;
    Text: string;
    UserId: number;
    UserRoleId: number;
    IsRead: boolean;
    IsActive: boolean;
    AddedBy: number;
    DateAdded: string;
    UpdatedBy?: any;
    DateUpdated?: any;
}

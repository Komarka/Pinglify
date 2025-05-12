export declare class CreateSubscriptionDto {
    userId: string;
    name: string;
    price: number;
    nextPayment: Date;
}
export declare class UpdateSubscriptionDto {
    name?: string;
    price?: number;
    nextPayment?: Date;
    isNotificationSent?: boolean;
}

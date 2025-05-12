import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './subscription.dto';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    create(createSubscriptionDto: CreateSubscriptionDto): Promise<{
        id: string;
        name: string;
        price: number;
        nextPayment: Date;
        userId: string;
        isNotificationSent: boolean;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        name: string;
        price: number;
        nextPayment: Date;
        userId: string;
        isNotificationSent: boolean;
    }[]>;
    update(id: string, updateSubscriptionDto: UpdateSubscriptionDto): Promise<{
        id: string;
        name: string;
        price: number;
        nextPayment: Date;
        userId: string;
        isNotificationSent: boolean;
    }>;
    delete(id: string): Promise<void>;
}

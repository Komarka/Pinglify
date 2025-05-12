import { DatabaseService } from 'src/database/database.service';
import { ISubscriptionRepository } from './subscription.types';
import { Subscription } from '@prisma/client';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './subscription.dto';
export declare class SubscriptionRepository implements ISubscriptionRepository {
    private readonly db;
    constructor(db: DatabaseService);
    create(dto: CreateSubscriptionDto): Promise<Subscription>;
    findAll(userId: string): Promise<Subscription[]>;
    update(id: string, dto: UpdateSubscriptionDto): Promise<Subscription>;
    delete(id: string): Promise<void>;
    findUpcomingPayments(startDate: Date, endDate: Date): Promise<({
        user: {
            id: string;
            telegramId: number;
            name: string;
            createdAt: Date;
        };
    } & {
        id: string;
        name: string;
        price: number;
        nextPayment: Date;
        userId: string;
        isNotificationSent: boolean;
    })[]>;
    findAllExpired(): Promise<Subscription[]>;
    findByBillingDate(date: Date): Promise<Subscription[]>;
}

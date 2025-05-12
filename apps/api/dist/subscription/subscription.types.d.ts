import { Subscription } from '@prisma/client';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './subscription.dto';
export interface ISubscriptionRepository {
    create(subscription: CreateSubscriptionDto): Promise<Subscription>;
    findAll(userId: string): Promise<Subscription[]>;
    update(id: string, dto: UpdateSubscriptionDto): Promise<Subscription>;
    delete(id: string): Promise<void>;
}

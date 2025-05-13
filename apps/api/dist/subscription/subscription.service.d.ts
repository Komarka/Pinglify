import { SubscriptionRepository } from './subscription.repository';
import { Subscription } from '@prisma/client';
import { BotService } from 'src/bot/bot.service';
import { UserService } from 'src/user/user.service';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './subscription.dto';
export declare class SubscriptionService {
    private readonly subscriptionRepository;
    private botService;
    private userService;
    private readonly logger;
    constructor(subscriptionRepository: SubscriptionRepository, botService: BotService, userService: UserService);
    create(dto: CreateSubscriptionDto): Promise<Subscription>;
    findAll(userId: string): Promise<Subscription[]>;
    update(id: string, dto: UpdateSubscriptionDto): Promise<Subscription>;
    delete(id: string): Promise<void>;
    updateExpiredSubscription(subscription: Subscription): Promise<void>;
    sendUpcomingPaymentNotifications(): Promise<void>;
    syncNextPaymentDate(nextPayment: Date): Promise<void>;
    notifyUser(subscription: Subscription): Promise<void>;
}

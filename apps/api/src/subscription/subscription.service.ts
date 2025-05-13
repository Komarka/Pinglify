import { Injectable, Logger } from '@nestjs/common';
import { SubscriptionRepository } from './subscription.repository';

import { Cron } from '@nestjs/schedule';
import { Subscription } from '@prisma/client';
import { BotService } from 'src/bot/bot.service';
import { UserService } from 'src/user/user.service';
import { addMonths, subDays } from 'date-fns';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from './subscription.dto';
import { CRON_NOTIFICATION_JOB, DAYS_OFFSET } from './consts';

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);

  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private botService: BotService,
    private userService: UserService,
  ) {}

  async create(dto: CreateSubscriptionDto): Promise<Subscription> {
    const result = await this.subscriptionRepository.create(dto);
    await this.syncNextPaymentDate(dto.nextPayment);
    return result;
  }

  async findAll(userId: string): Promise<Subscription[]> {
    return this.subscriptionRepository.findAll(userId);
  }

  async update(id: string, dto: UpdateSubscriptionDto): Promise<Subscription> {
    const result = await this.subscriptionRepository.update(id, dto);
    await this.syncNextPaymentDate(dto.nextPayment);
    return result;
  }

  async delete(id: string): Promise<void> {
    return this.subscriptionRepository.delete(id);
  }

  async updateExpiredSubscription(subscription: Subscription) {
    const updatedDate = addMonths(new Date(subscription.nextPayment), 1);

    await this.subscriptionRepository.update(subscription.id, {
      nextPayment: updatedDate,
      isNotificationSent: false,
    });

    this.logger.log(
      `Subscription ${subscription.id} updated to ${updatedDate}`,
    );
  }

  // for testing use '*/15 * * * * *'
  @Cron('0 10 * * *', { name: CRON_NOTIFICATION_JOB })
  async sendUpcomingPaymentNotifications() {
    this.logger.log('Running sendUpcomingPaymentNotifications job...');

    const threeDaysLater = new Date();
    threeDaysLater.setDate(threeDaysLater.getDate() + DAYS_OFFSET);

    const subscriptions =
      await this.subscriptionRepository.findUpcomingPayments(
        new Date(),
        threeDaysLater,
      );

    for (const subscription of subscriptions) {
      if (subscription.user?.telegramId) {
        await this.notifyUser(subscription);

        await this.subscriptionRepository.update(subscription.id, {
          isNotificationSent: true,
        });

        await this.updateExpiredSubscription(subscription);
      }
    }
  }

  async syncNextPaymentDate(nextPayment: Date) {
    this.logger.log(
      `Syncing next payment date for subscriptions with next payment date ${nextPayment}`,
    );

    if (nextPayment) {
      const nextPaymentDate = new Date(nextPayment);
      const now = new Date();

      const twoDaysBeforeNextPayment = subDays(nextPaymentDate, 2);

      const isTwoDaysBefore =
        twoDaysBeforeNextPayment.toDateString() === now.toDateString();

      const isAfter10AM = now.getHours() >= 10;

      if (isTwoDaysBefore && isAfter10AM) {
        await this.sendUpcomingPaymentNotifications();
      }
    }
  }

  async notifyUser(subscription: Subscription) {
    this.logger.log(
      `Notifying user ${subscription.userId} about upcoming transaction for subscription "${subscription.name}".`,
    );
    const message = `Reminder: Your subscription "${subscription.name}" will be charged in 2 days. Amount: $${subscription.price}.`;

    try {
      const chatId = await this.userService.getChatId(subscription.userId);
      await this.botService.sendMessage(chatId, message);
      this.logger.log(`Notification sent to user ${subscription.userId}.`);
    } catch (error) {
      this.logger.error(
        `Failed to send notification to user ${subscription.userId}: ${error.message}`,
      );
    }
  }
}

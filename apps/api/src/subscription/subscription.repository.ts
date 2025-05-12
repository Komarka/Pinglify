import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ISubscriptionRepository } from './subscription.types';
import { Subscription } from '@prisma/client';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from './subscription.dto';

@Injectable()
export class SubscriptionRepository implements ISubscriptionRepository {
  constructor(private readonly db: DatabaseService) {}

  async create(dto: CreateSubscriptionDto): Promise<Subscription> {
    return this.db.subscription.create({ data: dto });
  }

  async findAll(userId: string): Promise<Subscription[]> {
    return this.db.subscription.findMany({ where: { userId } });
  }

  async update(id: string, dto: UpdateSubscriptionDto): Promise<Subscription> {
    return this.db.subscription.update({ where: { id }, data: dto });
  }

  async delete(id: string): Promise<void> {
    await this.db.subscription.delete({ where: { id } });
  }

  async findUpcomingPayments(startDate: Date, endDate: Date) {
    return this.db.subscription.findMany({
      where: {
        nextPayment: {
          gte: startDate,
          lte: endDate,
        },
        isNotificationSent: false,
      },
      include: {
        user: true,
      },
    });
  }

  async findAllExpired(): Promise<Subscription[]> {
    return this.db.subscription.findMany({
      where: {
        nextPayment: {
          lt: new Date(),
        },
      },
    });
  }

  async findByBillingDate(date: Date): Promise<Subscription[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.db.subscription.findMany({
      where: {
        nextPayment: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
  }
}

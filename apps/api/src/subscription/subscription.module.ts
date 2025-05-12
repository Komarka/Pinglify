import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { DatabaseModule } from 'src/database/database.module';
import { SubscriptionRepository } from './subscription.repository';
import { BotModule } from 'src/bot/bot.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, BotModule, UserModule],
  providers: [SubscriptionService, SubscriptionRepository],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}

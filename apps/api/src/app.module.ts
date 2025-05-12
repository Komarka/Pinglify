import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SubscriptionModule } from './subscription/subscription.module';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { UserModule } from './user/user.module';
import { BotService } from './bot/bot.service';

@Module({
  imports: [
    SubscriptionModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    BotModule,
    UserModule,
  ],
  providers: [BotService],
})
export class AppModule {}

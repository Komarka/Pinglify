import { Update, Start, Ctx } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class BotUpdate {
  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.reply(
      'Hey! Welcome to the system 👋 You can press "Subscriptions" button to see and manage your subscriptions',
    );
  }
}

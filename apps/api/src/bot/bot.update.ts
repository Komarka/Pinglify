import { Update, Start, Ctx, Command } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class BotUpdate {
  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.reply(
      'Hey! Welcome to the system 👋 You can press "Subscriptions" button to see and manage your subscriptions',
    );
  }

  @Command('test')
  async onTest(@Ctx() ctx: Context) {
    await ctx.reply('Here is your test button:', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Test app',
              url: 'https://583c-84-40-152-215.ngrok-free.app',
            },
          ],
        ],
      },
    });
  }
}

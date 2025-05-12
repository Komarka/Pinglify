import { Telegraf } from 'telegraf';
export declare class BotService {
    private readonly bot;
    private readonly logger;
    constructor(bot: Telegraf);
    sendMessage(chatId: number, text: string): Promise<void>;
}

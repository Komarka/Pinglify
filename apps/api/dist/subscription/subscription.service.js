"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SubscriptionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const subscription_repository_1 = require("./subscription.repository");
const schedule_1 = require("@nestjs/schedule");
const bot_service_1 = require("../bot/bot.service");
const user_service_1 = require("../user/user.service");
const date_fns_1 = require("date-fns");
const consts_1 = require("./consts");
let SubscriptionService = SubscriptionService_1 = class SubscriptionService {
    constructor(subscriptionRepository, botService, userService) {
        this.subscriptionRepository = subscriptionRepository;
        this.botService = botService;
        this.userService = userService;
        this.logger = new common_1.Logger(SubscriptionService_1.name);
    }
    async create(dto) {
        await this.syncNextPaymentDate(dto.nextPayment);
        return this.subscriptionRepository.create(dto);
    }
    async findAll(userId) {
        return this.subscriptionRepository.findAll(userId);
    }
    async update(id, dto) {
        await this.syncNextPaymentDate(dto.nextPayment);
        return this.subscriptionRepository.update(id, dto);
    }
    async delete(id) {
        return this.subscriptionRepository.delete(id);
    }
    async updateExpiredSubscription(subscription) {
        const updatedDate = (0, date_fns_1.addMonths)(new Date(subscription.nextPayment), 1);
        await this.subscriptionRepository.update(subscription.id, {
            nextPayment: updatedDate,
            isNotificationSent: false,
        });
        this.logger.log(`Subscription ${subscription.id} updated to ${updatedDate}`);
    }
    async sendUpcomingPaymentNotifications() {
        this.logger.log('Running sendUpcomingPaymentNotifications job...');
        const threeDaysLater = new Date();
        threeDaysLater.setDate(threeDaysLater.getDate() + consts_1.DAYS_OFFSET);
        const subscriptions = await this.subscriptionRepository.findUpcomingPayments(new Date(), threeDaysLater);
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
    async syncNextPaymentDate(nextPayment) {
        this.logger.log(`Syncing next payment date for subscriptions with next payment date ${nextPayment}`);
        if (nextPayment) {
            const nextPaymentDate = new Date(nextPayment);
            const now = new Date();
            const twoDaysBeforeNextPayment = (0, date_fns_1.subDays)(nextPaymentDate, 2);
            const isTwoDaysBefore = twoDaysBeforeNextPayment.toDateString() === now.toDateString();
            const isAfter10AM = now.getHours() >= 10;
            if (isTwoDaysBefore && isAfter10AM) {
                await this.sendUpcomingPaymentNotifications();
            }
        }
    }
    async notifyUser(subscription) {
        this.logger.log(`Notifying user ${subscription.userId} about upcoming transaction for subscription "${subscription.name}".`);
        const message = `Reminder: Your subscription "${subscription.name}" will be charged in 2 days. Amount: $${subscription.price}.`;
        try {
            const chatId = await this.userService.getChatId(subscription.userId);
            await this.botService.sendMessage(chatId, message);
            this.logger.log(`Notification sent to user ${subscription.userId}.`);
        }
        catch (error) {
            this.logger.error(`Failed to send notification to user ${subscription.userId}: ${error.message}`);
        }
    }
};
exports.SubscriptionService = SubscriptionService;
__decorate([
    (0, schedule_1.Cron)('0 10 * * *', { name: consts_1.CRON_NOTIFICATION_JOB }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscriptionService.prototype, "sendUpcomingPaymentNotifications", null);
exports.SubscriptionService = SubscriptionService = SubscriptionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [subscription_repository_1.SubscriptionRepository,
        bot_service_1.BotService,
        user_service_1.UserService])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map
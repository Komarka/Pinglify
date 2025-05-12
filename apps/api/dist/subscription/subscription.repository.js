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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let SubscriptionRepository = class SubscriptionRepository {
    constructor(db) {
        this.db = db;
    }
    async create(dto) {
        return this.db.subscription.create({ data: dto });
    }
    async findAll(userId) {
        return this.db.subscription.findMany({ where: { userId } });
    }
    async update(id, dto) {
        return this.db.subscription.update({ where: { id }, data: dto });
    }
    async delete(id) {
        await this.db.subscription.delete({ where: { id } });
    }
    async findUpcomingPayments(startDate, endDate) {
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
    async findAllExpired() {
        return this.db.subscription.findMany({
            where: {
                nextPayment: {
                    lt: new Date(),
                },
            },
        });
    }
    async findByBillingDate(date) {
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
};
exports.SubscriptionRepository = SubscriptionRepository;
exports.SubscriptionRepository = SubscriptionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SubscriptionRepository);
//# sourceMappingURL=subscription.repository.js.map
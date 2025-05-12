"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionModule = void 0;
const common_1 = require("@nestjs/common");
const subscription_service_1 = require("./subscription.service");
const subscription_controller_1 = require("./subscription.controller");
const database_module_1 = require("../database/database.module");
const subscription_repository_1 = require("./subscription.repository");
const bot_module_1 = require("../bot/bot.module");
const user_module_1 = require("../user/user.module");
let SubscriptionModule = class SubscriptionModule {
};
exports.SubscriptionModule = SubscriptionModule;
exports.SubscriptionModule = SubscriptionModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, bot_module_1.BotModule, user_module_1.UserModule],
        providers: [subscription_service_1.SubscriptionService, subscription_repository_1.SubscriptionRepository],
        controllers: [subscription_controller_1.SubscriptionController],
    })
], SubscriptionModule);
//# sourceMappingURL=subscription.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const subscription_module_1 = require("./subscription/subscription.module");
const config_1 = require("@nestjs/config");
const bot_module_1 = require("./bot/bot.module");
const user_module_1 = require("./user/user.module");
const bot_service_1 = require("./bot/bot.service");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            subscription_module_1.SubscriptionModule,
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            bot_module_1.BotModule,
            user_module_1.UserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [bot_service_1.BotService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
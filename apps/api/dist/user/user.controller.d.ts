import { UserService } from './user.service';
import { UpsertUserDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    upsertUser(userData: UpsertUserDto): Promise<{
        id: string;
        telegramId: number;
        name: string;
        createdAt: Date;
    }>;
}

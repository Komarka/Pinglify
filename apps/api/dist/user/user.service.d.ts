import { UpsertUserPayload } from './user.types';
import { UserRepository } from './user.repository';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    upsertUser(data: UpsertUserPayload): Promise<{
        id: string;
        telegramId: number;
        name: string;
        createdAt: Date;
    }>;
    getChatId(userId: string): Promise<number | null>;
}

import { DatabaseService } from 'src/database/database.service';
import { IUserRepository, UpsertUserPayload } from './user.types';
export declare class UserRepository implements IUserRepository {
    private readonly db;
    constructor(db: DatabaseService);
    upsert(data: UpsertUserPayload): Promise<{
        id: string;
        telegramId: number;
        name: string;
        createdAt: Date;
    }>;
    findChatIdById(userId: string): Promise<{
        id: string;
        telegramId: number;
        name: string;
        createdAt: Date;
    }>;
}

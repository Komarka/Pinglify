import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { IUserRepository, UpsertUserPayload } from './user.types';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly db: DatabaseService) {}

  async upsert(data: UpsertUserPayload) {
    return this.db.user.upsert({
      where: { telegramId: data.telegramId },
      update: {},
      create: {
        telegramId: data.telegramId,
        name: data.name,
      },
    });
  }

  async findChatIdById(userId: string) {
    return this.db.user.findUnique({
      where: { id: userId },
    });
  }
}

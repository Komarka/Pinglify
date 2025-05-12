import { Injectable } from '@nestjs/common';
import { UpsertUserPayload } from './user.types';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async upsertUser(data: UpsertUserPayload) {
    return this.userRepository.upsert(data);
  }

  async getChatId(userId: string): Promise<number | null> {
    const user = await this.userRepository.findChatIdById(userId);
    return user?.telegramId || null;
  }
}

import { User } from '@prisma/client';

export interface IUserRepository {
  upsert(data: UpsertUserPayload): Promise<User>;
}

export interface UpsertUserPayload {
  telegramId: number;
  name?: string;
}

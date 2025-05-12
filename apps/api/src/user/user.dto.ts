import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpsertUserDto {
  @IsNumber()
  @IsNotEmpty()
  telegramId: number;

  @IsString()
  @IsOptional()
  name?: string;
}

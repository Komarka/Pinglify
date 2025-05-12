import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UpsertUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async upsertUser(@Body() userData: UpsertUserDto) {
    return this.userService.upsertUser(userData);
  }
}

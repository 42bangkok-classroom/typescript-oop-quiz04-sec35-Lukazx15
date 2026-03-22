import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';


type Users = {
  id: number;
  name: string;
};

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  user(): Users[] {
    return this.userService.user();
  }
}

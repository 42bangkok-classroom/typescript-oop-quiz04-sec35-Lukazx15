import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { IUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  user(): string[] {
    return this.userService.test();
  }

  @Get()
  findAll(): IUser[] {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('fields') fields?: string,
  ): Partial<IUser> {
    const fieldArray = fields ? fields.split(',') : undefined;
    return this.userService.findOne(id, fieldArray);
  }

  @Post()
  create(@Body(new ValidationPipe()) dto: CreateUserDto): IUser {
    return this.userService.create(dto);
  }
}

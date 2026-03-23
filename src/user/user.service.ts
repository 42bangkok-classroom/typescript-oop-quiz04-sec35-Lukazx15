import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';
import * as path from 'path';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  test(): string[] {
    return [];
  }

  findAll(): IUser[] {
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as IUser[];
  }

  findOne(id: string, fields?: string[]): Partial<IUser> {
    const users = this.findAll();

    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!fields) {
      return user;
    }
    if (fields.length === 0) {
      return {};
    }
    const result: Partial<IUser> = {};
    for (const field of fields) {
      if (field in user) {
        result[field as keyof IUser] = user[field as keyof IUser];
      }
    }
    return result;
  }

  create(dto: CreateUserDto): IUser {
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(data) as IUser[];
    const lastId = users.length > 0 ? Number(users[users.length - 1].id) : 0;
    const newId = (lastId + 1).toString();
    const newUser: IUser = {
      id: newId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      username: dto.username,
    };
    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    return newUser;
  }
}

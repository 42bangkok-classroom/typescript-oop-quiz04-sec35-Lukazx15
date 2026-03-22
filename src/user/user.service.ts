import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';
import * as path from 'path';

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
}

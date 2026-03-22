import { Injectable } from '@nestjs/common';
type Users ={
    id : number;
    name : string;
};

@Injectable()
export class UserService {
    user(): Users[] {
        return [];
    }
}

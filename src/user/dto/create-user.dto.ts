import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  fristname: string;
  @IsNotEmpty()
  lastname: string;
  email: string;
  username: string;
}

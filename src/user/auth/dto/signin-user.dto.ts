import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SigninUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

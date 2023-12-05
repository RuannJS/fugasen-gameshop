import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth/auth.service';
import { SignupUserDto } from './auth/dto/signup-user.dto';
import { User } from './user.entity';
import { SigninUserDto } from './auth/dto/signin-user.dto';
import { Token } from 'src/jsonwebtoken/token.class';

@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly auth: AuthService,
  ) {}

  // **********     Authentication Routes      **************

  @Post('signup')
  async userSignup(@Body() data: SignupUserDto): Promise<User> {
    return this.auth.userSignup(data);
  }

  @Post('signin')
  async userSignin(@Body() data: SigninUserDto): Promise<Token> {
    return this.auth.userSignin(data);
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth/auth.service';
import { SignupUserDto } from './auth/dto/signup-user.dto';
import { User } from './user.entity';
import { SigninUserDto } from './auth/dto/signin-user.dto';
import { Token } from 'src/jsonwebtoken/token.class';
import { UserGuard } from 'src/guards/user/user.guard';
import { UserInterceptor } from 'src/interceptors/user/user.interceptor';
import { UserDecorator } from 'src/decorators/user/user.decorator';
import { DecodedJWT } from 'src/jsonwebtoken/decodedJWT.class';

@Controller('user')
export class UserController {
  constructor(
    private readonly user: UserService,
    private readonly auth: AuthService,
  ) {}

  // **********    Allowed Routes      **************

  @Post('signup')
  async userSignup(@Body() data: SignupUserDto): Promise<User> {
    return this.auth.userSignup(data);
  }

  @Post('signin')
  async userSignin(@Body() data: SigninUserDto): Promise<Token> {
    return this.auth.userSignin(data);
  }

  // **********  Authentication Needed Routes      **************

  @UseGuards(UserGuard)
  @UseInterceptors(UserInterceptor)
  @Get('info')
  async getUserInfo(@UserDecorator() user: DecodedJWT): Promise<User> {
    return await this.user.getUserInfo(user);
  }
}

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
import { Token } from '../tokens/jwt/token.class';
import { UserGuard } from '../guards/user/user.guard';
import { TokenInterceptor } from 'src/interceptors/user.interceptor';
import { TokenDecorator } from '../decorators/user/user.decorator';
import { DecodedUser } from '../tokens/jwt/decodedUser.class';
import { UpdateUserDto } from './dto/update-user.dto';

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

  // **********   Authentication Needed User Routes      **************

  @UseGuards(UserGuard)
  @UseInterceptors(TokenInterceptor)
  @Get('info')
  async getUserInfo(@TokenDecorator() user: DecodedUser): Promise<User> {
    return await this.user.getUserInfo(user);
  }

  @UseGuards(UserGuard)
  @UseInterceptors(TokenInterceptor)
  @Put('update')
  async updateUserInfo(
    @Body() data: UpdateUserDto,
    @TokenDecorator() user: DecodedUser,
  ): Promise<User> {
    return await this.user.updateUserInfo(data, user);
  }

  @UseGuards(UserGuard)
  @UseInterceptors(TokenInterceptor)
  @Delete('delete')
  async deleteUser(@TokenDecorator() user: DecodedUser): Promise<boolean> {
    return await this.user.deleteUser(user);
  }
}

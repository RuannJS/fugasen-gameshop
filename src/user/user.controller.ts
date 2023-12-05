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

@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly auth: AuthService,
  ) {}

  @Post('signup')
  async userSignup() {}
}

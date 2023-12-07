import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { SignupPublisherDto } from './auth/dto/signup-publisher.dto';
import { Publisher } from './publisher.entity';
import { AuthService } from './auth/auth.service';
import { PublisherKey } from '../tokens/bcrypt/publisher-key.class';
import { SigninPublisherDto } from './auth/dto/signin-publisher.dto';
import { Token } from '../tokens/jwt/token.class';

@Controller('publisher')
export class PublisherController {
  constructor(
    private readonly service: PublisherService,
    private readonly auth: AuthService,
  ) {}

  // **********    Allowed Routes      **************

  @Post('signup')
  async publisherSignup(
    @Body() data: SignupPublisherDto,
  ): Promise<PublisherKey> {
    return this.auth.publisherSignup(data);
  }

  @Post('signin')
  async publisherSignin(@Body() data: SigninPublisherDto): Promise<Token> {
    return this.auth.publisherSignin(data);
  }
}

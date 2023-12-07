import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { SignupPublisherDto } from './auth/dto/signup-publisher.dto';

import { AuthService } from './auth/auth.service';
import { PublisherKey } from '../tokens/bcrypt/publisher-key.class';
import { SigninPublisherDto } from './auth/dto/signin-publisher.dto';
import { Token } from '../tokens/jwt/token.class';
import { PublisherGuard } from '../guards/publisher/publisher.guard';
import { TokenInterceptor } from '../interceptors/user.interceptor';
import { TokenDecorator } from '../decorators/publisher/publisher.decorator';
import { DecodedPublisher } from '../tokens/jwt/decodedPublisher.class';
import { UpdatePublisherDto } from './dto/update-publisher.dto';

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

  // **********   Authentication Needed Publisher Routes      **************

  @UseGuards(PublisherGuard)
  @UseInterceptors(TokenInterceptor)
  @Get('info')
  async getPublisherInfo(@TokenDecorator() publisher: DecodedPublisher) {
    return this.service.getPublisherInfo(publisher);
  }

  @UseGuards(PublisherGuard)
  @UseInterceptors(TokenInterceptor)
  @Put('update')
  async updatePublisherInfo(
    @Body() data: UpdatePublisherDto,
    @TokenDecorator() publisher: DecodedPublisher,
  ) {
    return this.service.updatePublisherInfo(data, publisher);
  }
}

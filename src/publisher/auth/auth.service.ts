import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupPublisherDto } from './dto/signup-publisher.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PublisherKey } from 'src/tokens/bcrypt/publisher-key.class';
import { SigninPublisherDto } from './dto/signin-publisher.dto';
import { Token } from '../../tokens/jwt/token.class';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async publisherSignup({
    name,
    thumbnail,
  }: SignupPublisherDto): Promise<PublisherKey> {
    const checkName = await this.prisma.publisher.findUnique({
      where: { name },
    });

    if (checkName) {
      throw new ConflictException('Name not available.');
    }

    const publisher = await this.prisma.publisher.create({
      data: { name, thumbnail },
    });

    const publisherKey = await bcrypt.hash(publisher.name, 10);

    const addKey = await this.prisma.publisher.update({
      where: { name: publisher.name },
      data: { publisherKey },
    });

    return new PublisherKey(publisherKey);
  }

  async publisherSignin({
    name,
    publisherKey,
  }: SigninPublisherDto): Promise<Token> {
    const publisher = await this.prisma.publisher.findUnique({
      where: { publisherKey },
    });

    if (!publisher) {
      throw new NotFoundException('Invalid credentials.');
    }

    const token = jwt.sign(
      { key: publisherKey, name },
      process.env.PUBLISHER_KEY,
    );

    return new Token(token);
  }
}

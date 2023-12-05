import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupUserDto } from './dto/signup-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../user.entity';
import { SigninUserDto } from './dto/signin-user.dto';
import { Token } from 'src/jsonwebtoken/token.class';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async userSignup(data: SignupUserDto): Promise<User> {
    const verifyEmail = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (verifyEmail) {
      throw new ConflictException('Email already in use.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });

    return user;
  }

  async userSignin({ email, password }: SigninUserDto): Promise<Token> {
    const verifyEmail = await this.prisma.user.findUnique({ where: { email } });

    if (!verifyEmail) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const verifyPassword = await bcrypt.compare(password, verifyEmail.password);

    if (!verifyPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const token = jwt.sign(email, process.env.USER_KEY);

    return new Token(token);
  }
}

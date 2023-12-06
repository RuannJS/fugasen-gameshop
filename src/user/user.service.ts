import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './user.entity';
import { DecodedJWT } from 'src/jsonwebtoken/decodedJWT.class';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserInfo(user: DecodedJWT): Promise<User> {
    const currentUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    return currentUser;
  }
}

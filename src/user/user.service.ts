import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './user.entity';
import { DecodedJWT } from 'src/jsonwebtoken/decodedJWT.class';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  getCurrentUser = async (email: string) => {
    return await this.prisma.user.findUnique({ where: { email } });
  };

  async getUserInfo(user: DecodedJWT): Promise<User> {
    const currentUser = this.getCurrentUser(user.email);

    return currentUser;
  }

  async updateUserInfo(data: UpdateUserDto, user: DecodedJWT): Promise<User> {
    const currentUser = await this.getCurrentUser(user.email);

    const updatedUser = await this.prisma.user.update({
      where: { email: currentUser.email },
      data,
    });

    return updatedUser;
  }

  async deleteUser(user: DecodedJWT): Promise<boolean> {
    const currentUser = await this.getCurrentUser(user.email);

    const deleteUser = await this.prisma.user.delete({
      where: { email: currentUser.email },
    });

    if (deleteUser) {
      return true;
    }

    return false;
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}

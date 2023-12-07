import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthService } from './user/auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { PublisherModule } from './publisher/publisher.module';

@Module({
  imports: [PrismaModule, UserModule, ConfigModule.forRoot(), PublisherModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}

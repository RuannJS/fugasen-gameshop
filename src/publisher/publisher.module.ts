import { Module } from '@nestjs/common';
import { PublisherController } from './publisher.controller';
import { PublisherService } from './publisher.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth/auth.service';

@Module({
  controllers: [PublisherController],
  providers: [PublisherService, AuthService],
  imports: [PrismaModule],
})
export class PublisherModule {}

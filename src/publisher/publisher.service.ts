import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Publisher } from './publisher.entity';
import { DecodedPublisher } from 'src/tokens/jwt/decodedPublisher.class';
import { UpdatePublisherDto } from './dto/update-publisher.dto';

@Injectable()
export class PublisherService {
  constructor(private readonly prisma: PrismaService) {}

  getCurrentPublisher = async (key: string): Promise<Publisher> => {
    return await this.prisma.publisher.findUnique({
      where: { publisherKey: key },
    });
  };

  async getPublisherInfo({ key }: DecodedPublisher): Promise<Publisher> {
    const publisher = this.getCurrentPublisher(key);

    return publisher;
  }

  async updatePublisherInfo(
    data: UpdatePublisherDto,
    { key }: DecodedPublisher,
  ): Promise<Publisher> {
    const publisher = await this.getCurrentPublisher(key);

    const updatePublisher = await this.prisma.publisher.update({
      where: { publisherKey: publisher.publisherKey },
      data,
    });

    return updatePublisher;
  }

  

}

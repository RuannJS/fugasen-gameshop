import { Test, TestingModule } from '@nestjs/testing';
import { PublisherService } from './publisher.service';
import { PrismaService } from '../prisma/prisma.service';
import { Publisher } from './publisher.entity';
import { ObjectId } from 'mongodb';
import { PublisherKey } from '../tokens/bcrypt/publisher-key.class';
import { DecodedPublisher } from 'src/tokens/jwt/decodedPublisher.class';
import { UpdatePublisherDto } from './dto/update-publisher.dto';

describe('PublisherService', () => {
  let service: PublisherService;
  let prisma: PrismaService;

  const mockDecodedToken: DecodedPublisher = {
    name: 'publisher1',
    key: 'publisherUnique1',
    iat: 1,
  };

  const mockPublisher: Publisher[] = [
    {
      id: new ObjectId().toString(),
      name: 'publisher1',
      thumbnail: 'publisher.image',
      publisherKey: 'publisherUnique1',
    },
    {
      id: new ObjectId().toString(),
      name: 'publisher2',
      thumbnail: 'publisher.image',
      publisherKey: 'publisherUnique2',
    },
    {
      id: new ObjectId().toString(),
      name: 'publisher3',
      thumbnail: 'publisher.image',
      publisherKey: 'publisherUnique3',
    },
  ];

  const mockPrisma = {
    publisher: {
      findUnique: jest.fn().mockResolvedValue(mockPublisher[0]),
      update: jest.fn().mockResolvedValue(mockPublisher[0]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublisherService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<PublisherService>(PublisherService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getCurrentPublisher', () => {
    it('should return current publisher', async () => {
      const publisher = await service.getCurrentPublisher('publisherUnique1');

      expect(publisher).toEqual(mockPublisher[0]);
    });
  });

  describe('getPublisherInfo', () => {
    it('should return publisher information', async () => {
      const publisher = await service.getPublisherInfo(mockDecodedToken);

      expect(publisher).toEqual(mockPublisher[0]);
    });
  });

  describe('updatePublisherInfo', () => {
    it('should return updated publisher information', async () => {
      const publisher = await service.updatePublisherInfo(
        { name: 'updated' },
        mockDecodedToken,
      );
      expect(publisher).toEqual(mockPublisher[0]);
    });
  });
});

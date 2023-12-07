import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Publisher } from '../publisher.entity';
import { ObjectId } from 'mongodb';
import { PublisherKey } from '../../tokens/bcrypt/publisher-key.class';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

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
      create: jest.fn().mockResolvedValue(mockPublisher[0]),
      update: jest.fn().mockResolvedValue(mockPublisher[0]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('publisherSignup', () => {
    it('should create a publisher and return a publisherKey', async () => {
      const publisher = await service.publisherSignup({
        name: 'publisher4',
        thumbnail: 'publisher.image',
      });
      expect(publisher).toBeDefined();
    });
  });

  describe('publisherSignin', () => {
    it('should return a publisher token', async () => {
      const publisher = await service.publisherSignin({
        name: mockPublisher[0].name,
        publisherKey: mockPublisher[0].publisherKey,
      });
      expect(publisher).toBeDefined();
    });
  });
});

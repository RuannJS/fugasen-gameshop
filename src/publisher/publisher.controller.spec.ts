import { Test, TestingModule } from '@nestjs/testing';
import { PublisherController } from './publisher.controller';
import { AuthService } from './auth/auth.service';
import { PublisherService } from './publisher.service';
import { Publisher } from './publisher.entity';
import { ObjectId } from 'mongodb';
import { PublisherKey } from '../tokens/bcrypt/publisher-key.class';
import { Token } from '../tokens/jwt/token.class';
import { DecodedPublisher } from '../tokens/jwt/decodedPublisher.class';

describe('PublisherController', () => {
  let controller: PublisherController;
  let auth: AuthService;
  let service: PublisherService;

  const mockDecodedToken: DecodedPublisher = {
    name: 'publisher1',
    key: 'publisherUnique1',
    iat: 1,
  };

  const mockKey = new PublisherKey('publisherUnique1');

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublisherController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            publisherSignup: jest
              .fn()
              .mockResolvedValue(new PublisherKey('publisherUnique1')),
            publisherSignin: jest.fn().mockResolvedValue(new Token('token')),
          },
        },
        {
          provide: PublisherService,
          useValue: {
            getCurrentPublisher: jest.fn().mockResolvedValue(mockPublisher[0]),
            getPublisherInfo: jest.fn().mockResolvedValue(mockPublisher[0]),
            updatePublisherInfo: jest.fn().mockResolvedValue(mockPublisher[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<PublisherController>(PublisherController);
    auth = module.get<AuthService>(AuthService);
    service = module.get<PublisherService>(PublisherService);
  });

  describe('publisherSignup', () => {
    it('should create new publisher and return publisherKey', async () => {
      const publisher = await controller.publisherSignup({
        name: 'publisher4',
        thumbnail: 'publisher.image',
      });
      expect(publisher).toEqual(mockKey);
    });
  });

  describe('publisherSignin', () => {
    it('should return a jwt token', async () => {
      const publisher = await controller.publisherSignin({
        name: 'publisher1',
        publisherKey: 'publisherUnique1',
      });
      expect(publisher).toEqual(new Token('token'));
    });
  });

  describe('getPublisherInfo', () => {
    it('should return current publisher', async () => {
      const publisher = await controller.getPublisherInfo(mockDecodedToken);
      expect(publisher).toEqual(mockPublisher[0]);
    });
  });

  describe('updatePublisherInfo', () => {
    it('should return updated publisher', async () => {
      const publisher = await controller.updatePublisherInfo(
        { name: 'updated' },
        mockDecodedToken,
      );
      expect(publisher).toEqual(mockPublisher[0]);
    });
  });
});

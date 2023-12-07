import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './user.entity';
import { ObjectId } from 'mongodb';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  const mockUsers: User[] = [
    {
      id: new ObjectId().toString(),
      username: 'mocked1',
      password: 'password',
      email: 'mocked@mocked.com',
      profileImg: 'image',
    },
    {
      id: new ObjectId().toString(),
      username: 'mocked2',
      password: 'password',
      email: 'mocked2@mocked.com',
      profileImg: 'image',
    },
    {
      id: new ObjectId().toString(),
      username: 'mocked3',
      password: 'password',
      email: 'mocked3@mocked.com',
      profileImg: 'image',
    },
  ];

  const mockUserUpdate: User = {
    username: 'updated',
    email: 'mock@mock.com',
    id: new ObjectId().toString(),
    password: 'mock',
    profileImg: 'mock',
  };

  const mockPrisma = {
    user: {
      findMany: jest.fn().mockResolvedValue(mockUsers),
      findUnique: jest.fn().mockResolvedValue(mockUsers[0]),
      delete: jest.fn().mockResolvedValue(true),
      update: jest.fn().mockResolvedValue(mockUserUpdate),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getUserInfo', () => {
    it('should return user information', async () => {
      const user = await service.getUserInfo({
        email: mockUsers[0].email,
        iat: 1,
      });
      expect(user).toEqual(mockUsers[0]);
    });
  });

  describe('updateUserInfo', () => {
    it('should return updated user information', async () => {
      const user = await service.updateUserInfo(
        { username: 'updatedName' },
        { email: mockUsers[0].email, iat: 1 },
      );

      expect(user.username).toEqual(mockUserUpdate.username);
    });
  });

  describe('deleteUser', () => {
    it('should delete an user and return true', async () => {
      const user = await service.deleteUser({
        email: mockUsers[0].email,
        iat: 1,
      });

      expect(user).toBeTruthy();
    });
  });
});

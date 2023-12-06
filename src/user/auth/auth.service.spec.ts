import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from '../user.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { ObjectId } from 'mongodb';
import { SignupUserDto } from './dto/signup-user.dto';

describe('AuthService', () => {
  let service: AuthService;
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

  const mockPrisma = {
    user: {
      findMany: jest.fn().mockResolvedValue(mockUsers),
      findUnique: jest.fn().mockResolvedValue(mockUsers[0]),
      create: jest.fn().mockResolvedValue(mockUsers[0]),
    },
  };

  const mockSignUser: SignupUserDto = {
    email: 'randomasfuckemail@random.com',
    password: 'mock',
    profileImg: 'mock',
    username: 'usermock',
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

  describe('userSignup', () => {
    it('should return a new user', async () => {
      const user = await service.userSignup(mockSignUser);

      expect(user).toEqual(mockUsers[0]);
    });
  });
});

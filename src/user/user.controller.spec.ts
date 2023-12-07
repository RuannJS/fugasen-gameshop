import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ObjectId } from 'mongodb';
import { Token } from '../tokens/jwt/token.class';
import { AuthService } from './auth/auth.service';
import { SignupUserDto } from './auth/dto/signup-user.dto';
import { SigninUserDto } from './auth/dto/signin-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let auth: AuthService;

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

  const mockUserSignup: SignupUserDto = {
    email: 'newmock@mock.com',
    password: 'newmock',
    profileImg: 'newimage',
    username: 'newmock',
  };

  const mockUserSignin: SigninUserDto = {
    email: 'newmock@mock.com',
    password: 'newmock',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            getCurrentUser: jest.fn().mockResolvedValue(mockUsers[0]),
            getUserInfo: jest.fn().mockResolvedValue(mockUsers[0]),
            updateUserInfo: jest.fn().mockResolvedValue(mockUserUpdate),
            deleteUser: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: AuthService,
          useValue: {
            userSignup: jest.fn().mockResolvedValue(mockUsers[0]),
            userSignin: jest.fn().mockResolvedValue(new Token('token')),
          },
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    auth = module.get<AuthService>(AuthService);
  });

  describe('getCurrentUser', () => {
    it('should return current user', async () => {
      const user = await controller.getUserInfo({
        email: mockUsers[0].email,
        iat: 1,
      });

      expect(user).toEqual(mockUsers[0]);
    });
  });

  describe('updateUserInfo', () => {
    it('should return current updated user', async () => {
      const user = await controller.updateUserInfo(
        { username: 'updated' },
        { email: mockUsers[0].email, iat: 1 },
      );
      expect(user.username).toEqual(mockUserUpdate.username);
    });
  });

  describe('deleteUser', () => {
    it('should delete current user and return boolean', async () => {
      const user = await controller.deleteUser({
        email: mockUsers[0].email,
        iat: 1,
      });
      expect(user).toBeTruthy();
    });
  });

  describe('userSignup', () => {
    it('should return new user information', async () => {
      const user = await controller.userSignup(mockUserSignup);

      expect(user).toEqual(mockUsers[0]);
    });
  });

  describe('userSignin', () => {
    it('should return new user information', async () => {
      const user = await controller.userSignin(mockUserSignin);

      expect(user).toEqual(new Token('token'));
    });
  });
});

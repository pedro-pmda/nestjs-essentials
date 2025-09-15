import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ExpressAdapter } from '@nestjs/platform-express';

const newUser: CreateUserDto = {
  name: 'Kitoko Mwana',
  email: 'kitoko@test.com',
};

describe('UserService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'EXTERNAL_USER_DATA_SERVICE',
          useValue: {
            fetchUsers: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', () => {
    const user = service.createUser(newUser);
    expect(user).toBeDefined();
    expect(user.name).toBe(newUser.name);
    expect(user.email).toBe(newUser.email);
  });

  it('should return an array of users', async () => {
    const users = await service.findAll();
    expect(users.length).toBeGreaterThanOrEqual(0);
  });

  it('should update a user', () => {
    const user = service.updateUser({
      name: 'Tshimanga MUKENDI John',
      id: 1,
    });
    expect(user).toBeDefined();
    expect(user.name).toBe('Tshimanga MUKENDI John');
  });

  it('should fail to update a nonexistent user', () => {
    expect(() =>
      service.updateUser({
        name: 'Tshimanga MUKENDI John',
        id: 100,
      }),
    ).toThrow('User not found');
  });
});

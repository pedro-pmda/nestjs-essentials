import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ExternalUserDataService } from 'src/external-services/external-user-data.service';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    // Here are our mock users
    { id: 1, name: 'Tshimanga Mikendi', email: 'tshim@myapp.com' },
    { id: 2, name: 'Kasereka Akim', email: 'kase@myapp.com' },
  ];

  constructor(
    @Inject('EXTERNAL_USER_DATA_SERVICE')
    private externalUserService: ExternalUserDataService,
  ) {}

  // findAll(): User[] {
  //   return this.users;
  // }

  async findAll(): Promise<User[]> {
    const externalUsers = await this.externalUserService.fetchUsers();
    return externalUsers;
  }

  // async findOne(id: number): Promise<User | undefined> {
  //   return this.users.find((user) => user.id === id);
  // }

  async findOne(id: number): Promise<User | undefined> {
    //return this.users.find((user) => user.id === id);
    const externalUsers = await this.externalUserService.fetchUsers();
    return externalUsers.find((user) => user.id === id);
  }

  createUser(user: CreateUserDto) {
    this.users.push({
      ...user,
      id: this.users.length + 1,
    });
  }

  updateUser(user: UpdateUserDto & { id: number }) {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index === -1) {
      throw new Error('User not found');
    }

    this.users[index] = {
      name: user.name ?? this.users[index].name,
      email: user.email ?? this.users[index].email,
      id: this.users[index].id,
    };
  }
}

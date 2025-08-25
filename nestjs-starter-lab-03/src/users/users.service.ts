import { Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    // Here are our mock users
    { id: 1, name: 'Tshimanga Mikendi', email: 'tshim@myapp.com' },
    { id: 2, name: 'Kasereka Akim', email: 'kase@myapp.com' },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
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

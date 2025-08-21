import { Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    // Here are our mock users
    { id: 1, name: 'Tshimanga Mikendi', email: 'tshim@myapp.com' },
    { id: 2, name: 'Kasereka Akim', email: 'kase@myapp.com' },
  ];

  findAll(): User[] {
    return this.users;
  }
}
1;

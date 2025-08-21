import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './entities/users.controller';

@Module({
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}

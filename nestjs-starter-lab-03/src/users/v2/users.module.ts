import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { ExternalUserDataService } from 'src/external-services/external-user-data.service';

@Module({
  providers: [
    UsersService,
    {
      provide: 'EXTERNAL_USER_DATA_SERVICE',
      useClass: ExternalUserDataService,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}

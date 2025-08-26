import { Module } from '@nestjs/common';
import { UsersService } from './v1/users.service';
import { UserController } from './v1/users.controller';

import { UsersService as UsersServiceV2 } from './v2/users.service';
import { UserController as UserControllerV2 } from './v2/users.controller';

import { ExternalUserDataService } from 'src/external-services/external-user-data.service';

@Module({
  providers: [
    UsersService,
    UsersServiceV2,
    {
      provide: 'EXTERNAL_USER_DATA_SERVICE',
      useClass: ExternalUserDataService,
    },
  ],
  controllers: [UserController, UserControllerV2],
})
export class UserModule {}

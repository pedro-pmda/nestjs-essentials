import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { InfoController } from './info/info.controller';
import { LoggingService } from './logging/logging.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, InfoController],
  providers: [AppService, LoggingService],
})
export class AppModule {}

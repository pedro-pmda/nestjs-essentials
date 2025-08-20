import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { InfoController } from './info/info.controller';
import { LoggingService } from './logging/logging.service';
import { DataController } from './data/data.controller';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [MessagesModule],
  controllers: [AppController, UsersController, InfoController, DataController],
  providers: [AppService, LoggingService],
})
export class AppModule {}

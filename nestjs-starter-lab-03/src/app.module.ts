import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { LoggingMiddleware } from './commons/middleware/logging.middleware';
import { ResponseLoggingInterceptor } from './commons/interceptors/response-logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { VersioningManagementMiddleware } from './commons/middleware/versioning-manager.middleware';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ResponseLoggingInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware, VersioningManagementMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

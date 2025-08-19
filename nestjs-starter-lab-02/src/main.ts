import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingMiddleware } from './core/middlewares/logging.middleware';
import { TimeBasedGuard } from './core/guards/time-based.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new LoggingMiddleware().use);
  app.useGlobalGuards(new TimeBasedGuard());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

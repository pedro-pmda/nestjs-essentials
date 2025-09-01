import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { HttpErrorFilter } from './commons/filters/http-exception.filter';
import { SuccessResponseInterceptor } from './commons/interceptors/success-respone.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI, // opciones: URI | HEADER | MEDIA_TYPE
    defaultVersion: '1',
  });

  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalInterceptors(new SuccessResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

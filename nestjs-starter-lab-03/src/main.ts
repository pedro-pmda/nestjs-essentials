import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { HttpErrorFilter } from './commons/filters/http-exception.filter';
import { SuccessResponseInterceptor } from './commons/interceptors/success-respone.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI, // opciones: URI | HEADER | MEDIA_TYPE
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('User Management API')
    .setDescription('API for managing users')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalInterceptors(new SuccessResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

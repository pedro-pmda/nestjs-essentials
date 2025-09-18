import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from 'src/app.module';
import { UsersService } from 'src/users/v1/users.service';
import { HttpErrorFilter } from 'src/commons/filters/http-exception.filter';
import { SuccessResponseInterceptor } from 'src/commons/interceptors/success-respone.interceptor';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        UsersService,
        {
          provide: 'EXTERNAL_USER_DATA_SERVICE',
          useValue: {
            fetchUsers: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableVersioning({
      type: VersioningType.URI,
    });
    app.useGlobalFilters(new HttpErrorFilter());
    app.useGlobalInterceptors(new SuccessResponseInterceptor());
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/v1/')
      .expect(200)
      .expect((res) => {
        console.log('🧪 Respuesta del endpoint:', JSON.stringify(res.body));
        expect(res.body.message).toBe('OK');
        expect(res.body.data).toBe('Hello World!');
        expect(res.body.timestamp).toBeDefined();
      });
  });
});

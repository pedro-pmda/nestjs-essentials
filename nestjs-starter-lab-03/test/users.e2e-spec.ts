import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from 'src/app.module';
import { UsersService } from 'src/users/v1/users.service';
import { HttpErrorFilter } from 'src/commons/filters/http-exception.filter';
import { SuccessResponseInterceptor } from 'src/commons/interceptors/success-respone.interceptor';

describe('User Management (e2e)', () => {
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
      defaultVersion: '1',
    });
    app.useGlobalFilters(new HttpErrorFilter());
    app.useGlobalInterceptors(new SuccessResponseInterceptor());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /v1/users - should retrievea a list of users', async () => {
    const response = await request(app.getHttpServer())
      .get('/v1/users')
      .expect(200);
    expect(response.body).toHaveProperty('data');
    const { data } = response.body;
    expect(data).toBeInstanceOf(Array);
    expect(data[0]).toHaveProperty('name');
  });

  it('POST /v1/users - should create a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/users')
      .set('Authorization', 'Bearer mock-token')
      .send({
        name: 'Justin Dusenge',
        email: 'justin@example.com',
      })
      .expect(201);

    expect(response.body).toHaveProperty('data');
    const { statusCode, message, timestamp, path, method, data } =
      response.body;
    expect(statusCode).toBe(200);
    expect(message).toEqual('OK');
    expect(timestamp).toBeDefined();
    expect(path).toEqual('/v1/users');
    expect(method).toEqual('POST');
    expect(data.name).toEqual('Justin Dusenge');
    expect(data.email).toEqual('justin@example.com');
  });
});

import {
    BadRequestException,
    INestApplication,
    ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { config } from '../../../../configs/config';
import { databaseConfig } from '../../../../configs/database.config';
import { jwtConfig } from '../../../../configs/jwt.config';
import { UserModule } from '../../user.module';

describe('Create user E2E test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [config, databaseConfig, jwtConfig, UserModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        enableDebugMessages: false,
        exceptionFactory: (errors) => {
          if (errors.length != 0) {
            throw new BadRequestException({
              message: 'Validation failed!',
              success: false,
            });
          }
        },
      }),
    );
    await app.init();
  });

  afterAll(async () => await app.close());

  const url = '/user';

  it('Should return validation failed', async () => {
    const response = await request(app.getHttpServer()).post(url);
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('Validation failed!');
  });

  it('Should return user created successfully', async () => {
    const payload = {
      email: 'bilal@pds.com',
      password: 'password',
      username: 'bilal123',
      role: 'operator',
    };
    const response = await request(app.getHttpServer()).post(url).send(payload);
    expect(response.statusCode).toEqual(201);
    expect(response.body.message).toEqual('User created successfully');
  });

  it('Should return user already exist', async () => {
    const payload = {
      email: 'bilal@pds.com',
      password: 'password',
      username: 'bilal123',
      role: 'operator',
    };
    const response = await request(app.getHttpServer()).post(url).send(payload);
    expect(response.statusCode).toEqual(409);
    expect(response.body.message).toEqual('User already exist!');
  });
});

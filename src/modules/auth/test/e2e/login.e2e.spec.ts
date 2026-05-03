/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
import { AuthModule } from '../../auth.module';

describe('Login E2E test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [config, databaseConfig, jwtConfig, AuthModule],
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

  afterAll(async () => app.close());

  const endpoint = '/auth/login';

  it('Should return validation exception', async () => {
    const response = await request(app.getHttpServer()).post(endpoint);
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('Validation failed!');
  });

  it('Should return user not found', async () => {
    const requestBody = {
      username: 'user',
      password: 'password',
    };
    const response = await request(app.getHttpServer())
      .post(endpoint)
      .send(requestBody);
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual('User not found!');
  });

  it('Should return login successful', async () => {
    const requestBody = {
      username: 'user_name',
      password: 'password',
    };
    const response = await request(app.getHttpServer())
      .post(endpoint)
      .send(requestBody);
    expect(response.statusCode).toEqual(201);
    expect(response.body.message).toEqual('Login successful');
  });
});

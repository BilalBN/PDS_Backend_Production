import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createTestToken } from '../../../../../test/helpers/test.jwt.helper';
import { config } from '../../../../configs/config';
import { databaseConfig } from '../../../../configs/database.config';
import { jwtConfig } from '../../../../configs/jwt.config';
import { SupervisorModule } from '../../supervisor.module';

describe('Get supervised batches E2E test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [config, databaseConfig, jwtConfig, SupervisorModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => await app.close());

  const url = '/supervisor/batches?limit=20&page=1';

  it('Should return batches', async () => {
    const token = createTestToken({ id: 2 });
    const response = await request
      .agent(app.getHttpServer())
      .get(url)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toEqual(200);
  });
});

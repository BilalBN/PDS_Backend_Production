import { MikroORM } from '@mikro-orm/postgresql';
import { config } from 'dotenv';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { ProductsSchema } from '../../src/modules/products/entities/products.entity';
import {
    MainStepsSchema,
    MainStepsSchemaClass,
} from '../../src/modules/steps/entities/main.steps.entity';

describe('Main steps db test', () => {
  let orm: MikroORM;

  beforeAll(async () => {
    config();
    orm = await MikroORM.init({
      clientUrl: process.env.DB_URL,
      entities: [ProductsSchema, MainStepsSchema],
    });
  });

  afterAll(async () => await orm.close());

  it('Should return all main steps', async () => {
    const em = orm.em.fork();
    const mainSteps = await em.findAll(MainStepsSchemaClass);
    expect(mainSteps.length).toEqual(67);
  });

  it('Should return product with main step id', async () => {
    const em = orm.em.fork();
    const mainStep = await em.findOne(
      MainStepsSchemaClass,
      { id: 1 },
      { populate: ['product'] },
    );
    expect(mainStep?.product?.name).toEqual('Ashwagandha Extract 2.5%');
  });
});

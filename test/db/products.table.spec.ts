import { MikroORM } from '@mikro-orm/postgresql';
import { config } from 'dotenv';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  ProductsSchema,
  ProductsSchemaClass,
} from '../../src/modules/products/entities/products.entity';

describe('Products db test', () => {
  let orm: MikroORM;

  beforeAll(async () => {
    config();
    orm = await MikroORM.init({
      clientUrl: process.env.DB_URL,
      entities: [ProductsSchema],
    });
  });

  afterAll(async () => await orm.close());

  it('Should return all products', async () => {
    const em = orm.em.fork();
    const products = await em.findAll(ProductsSchemaClass);
    expect(products.length).toEqual(6);
  });
});

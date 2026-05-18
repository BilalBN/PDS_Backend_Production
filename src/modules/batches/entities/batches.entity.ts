import { defineEntity, p } from '@mikro-orm/core';
import { ProductsSchemaClass } from '../../products/entities/products.entity';
import { UserSchemaClass } from '../../user/entities/user.entity';

export const BatchesSchema = defineEntity({
  name: 'BatchesSchemaClass',
  tableName: 'batches',
  properties: {
    id: p.integer().primary(),
    name: p.text().index(),
    size: p.integer(),
    expiry_date: p.datetime(),
    start_date: p.datetime(),
    end_date: p.datetime(),
    status: p.text().default('active'),
    created_at: p.datetime(),
    created_by: () => p.manyToOne(UserSchemaClass).nullable(),
    supervised_by: () => p.manyToOne(UserSchemaClass).nullable(),
    product: () => p.manyToOne(ProductsSchemaClass).nullable(),
  },
});

export class BatchesSchemaClass extends BatchesSchema.class {}
BatchesSchema.setClass(BatchesSchemaClass);

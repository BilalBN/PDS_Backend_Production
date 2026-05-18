import { Cascade, defineEntity, p } from '@mikro-orm/core';
import { BatchesSchemaClass } from '../../batches/entities/batches.entity';
import { MainStepsSchemaClass } from '../../steps/entities/main.steps.entity';

export const ProductsSchema = defineEntity({
  name: 'ProductsSchemaClass',
  tableName: 'products',
  properties: {
    id: p.integer().primary(),
    name: p.text(),
    created_at: p.datetime(),
    main_steps: () =>
      p
        .oneToMany(MainStepsSchemaClass)
        .mappedBy('product')
        .cascade(Cascade.ALL)
        .orphanRemoval(true),
    batches: () =>
      p
        .oneToMany(BatchesSchemaClass)
        .mappedBy('product')
        .cascade(Cascade.ALL)
        .orphanRemoval(true),
  },
});

export class ProductsSchemaClass extends ProductsSchema.class {}
ProductsSchema.setClass(ProductsSchemaClass);

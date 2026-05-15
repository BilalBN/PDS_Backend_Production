import { defineEntity, p } from '@mikro-orm/core';
import { BatchesSchemaClass } from '../../batches/entities/batches.entity';
import { MainStepsSchemaClass } from '../../steps/entities/main.steps.entity';

export const ProductsSchema = defineEntity({
  name: 'ProductsSchemaClass',
  tableName: 'products',
  properties: {
    id: p.integer().primary(),
    name: p.text(),
    created_at: p.datetime(),
    main_steps: () => p.oneToMany(MainStepsSchemaClass).mappedBy('product'),
    batches: () => p.oneToMany(BatchesSchemaClass).mappedBy('product'),
  },
});

export class ProductsSchemaClass extends ProductsSchema.class {}
ProductsSchema.setClass(ProductsSchemaClass);

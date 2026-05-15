import { Cascade, defineEntity, p } from '@mikro-orm/core';
import { ProductsSchemaClass } from '../../products/entities/products.entity';

export const MainStepsSchema = defineEntity({
  name: 'MainStepsSchemaClass',
  tableName: 'main_steps',
  properties: {
    id: p.integer().primary(),
    name: p.text(),
    created_at: p.datetime(),
    product: () =>
      p.manyToOne(ProductsSchemaClass).nullable().cascade(Cascade.ALL),
  },
});

export class MainStepsSchemaClass extends MainStepsSchema.class {}
MainStepsSchema.setClass(MainStepsSchemaClass);

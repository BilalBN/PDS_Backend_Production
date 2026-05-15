import { defineEntity, p } from '@mikro-orm/core';

export const ProductsSchema = defineEntity({
  name: 'ProductsSchemaClass',
  tableName: 'products',
  properties: {
    id: p.integer().primary(),
    name: p.text(),
    created_at: p.datetime(),
  },
});

export class ProductsSchemaClass extends ProductsSchema.class {}
ProductsSchema.setClass(ProductsSchemaClass);

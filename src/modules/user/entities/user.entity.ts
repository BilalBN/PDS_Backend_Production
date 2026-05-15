import { defineEntity, p } from '@mikro-orm/core';
import { compare } from 'bcrypt';
import { BatchesSchemaClass } from '../../batches/entities/batches.entity';

export const UserSchema = defineEntity({
  name: 'UserSchemaClass',
  tableName: 'users',
  properties: {
    id: p.integer().primary(),
    email: p.text().unique().nullable(),
    password: p.text().hidden(),
    phone: p.text().unique().nullable(),
    role: p.text(),
    status: p.text().default('active'),
    username: p.text().index(),
    created_at: p.datetime(),
    updated_at: p.datetime().nullable(),
    created_batches: () =>
      p.oneToMany(BatchesSchemaClass).mappedBy('created_by'),
    supervised_batches: () =>
      p.oneToMany(BatchesSchemaClass).mappedBy('supervised_by'),
  },
});

export class UserSchemaClass extends UserSchema.class {
  async verifyPassword(password: string) {
    return await compare(password, this.password);
  }
}
UserSchema.setClass(UserSchemaClass);

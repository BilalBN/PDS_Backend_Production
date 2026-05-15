import { Cascade, defineEntity, p } from '@mikro-orm/core';
import { MainStepsSchemaClass } from './main.steps.entity';

export const SubStepsSchema = defineEntity({
  name: 'SubStepsSchemaClass',
  tableName: 'sub_steps',
  properties: {
    id: p.integer().primary(),
    name: p.text(),
    dynamic: p.boolean().default(false),
    created_at: p.datetime(),
    main_step: () =>
      p.manyToOne(MainStepsSchemaClass).nullable().cascade(Cascade.ALL),
  },
});

export class SubStepsSchemaClass extends SubStepsSchema.class {}
SubStepsSchema.setClass(SubStepsSchemaClass);

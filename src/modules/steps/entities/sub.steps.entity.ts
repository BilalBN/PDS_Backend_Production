import { Cascade, defineEntity, p } from '@mikro-orm/core';
import { ParametersSchemaClass } from '../../parameters/entities/parameters.entity';
import { MainStepsSchemaClass } from './main.steps.entity';

export const SubStepsSchema = defineEntity({
  name: 'SubStepsSchemaClass',
  tableName: 'sub_steps',
  properties: {
    id: p.integer().primary(),
    name: p.text(),
    dynamic: p.boolean().default(false),
    created_at: p.datetime(),
    main_step: () => p.manyToOne(MainStepsSchemaClass).nullable(),
    parameters: () =>
      p
        .oneToMany(ParametersSchemaClass)
        .mappedBy('subStep')
        .cascade(Cascade.ALL)
        .orphanRemoval(true),
  },
});

export class SubStepsSchemaClass extends SubStepsSchema.class {}
SubStepsSchema.setClass(SubStepsSchemaClass);

import { defineEntity, p } from '@mikro-orm/core';
import { SubStepsSchemaClass } from '../../steps/entities/sub.steps.entity';

export const ParametersSchema = defineEntity({
  name: 'ParametersSchemaClass',
  tableName: 'parameters',
  properties: {
    id: p.integer().primary(),
    instructions: p.text().nullable(),
    name: p.text(),
    type: p.text().nullable(),
    unit: p.text().nullable(),
    subStep: () => p.manyToOne(SubStepsSchemaClass).nullable(),
  },
});

export class ParametersSchemaClass extends ParametersSchema.class {}
ParametersSchema.setClass(ParametersSchemaClass);

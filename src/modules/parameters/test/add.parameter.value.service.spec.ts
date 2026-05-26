import { NotFoundException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { config } from '../../../configs/config';
import {
  databaseConfig,
  mongoDbConfig,
} from '../../../configs/database.config';
import { ParameterValuesSchema } from '../entities/parameter.value.entity';
import { AddParameterValueService } from '../services/add.parameter.value.service';

describe('Add sub step value service test', () => {
  let addSubStepValueService: AddParameterValueService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        config,
        databaseConfig,
        mongoDbConfig,
        MongooseModule.forFeature([
          {
            schema: ParameterValuesSchema,
            name: 'parameterValue',
          },
        ]),
      ],
      providers: [AddParameterValueService],
    }).compile();
    addSubStepValueService = module.get(AddParameterValueService);
  });

  afterAll(async () => await module.close());

  it('Should return sub steps', async () => {
    const subStepValue = {
      batch_id: 1,
      entered_by: 10,
      parameter_id: 10,
      value: 'test',
    };
    const result = await addSubStepValueService.addValue(1, subStepValue);
    expect(result.message).toEqual('Value added successfully');
  });

  it('Should return user found!', async () => {
    const subStepValue = {
      batch_id: 0,
      entered_by: 0,
      parameter_id: 0,
      value: undefined,
    };
    await expect(
      addSubStepValueService.addValue(100, subStepValue),
    ).rejects.toThrow(NotFoundException);
  });
});

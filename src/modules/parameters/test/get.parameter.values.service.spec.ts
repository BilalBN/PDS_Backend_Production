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
import { GetParameterValuesService } from '../services/get.parameter.values.service';

describe('Get parameter values service test', () => {
  let getParameterValuesService: GetParameterValuesService;
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
      providers: [GetParameterValuesService],
    }).compile();
    getParameterValuesService = module.get(GetParameterValuesService);
  });

  afterAll(async () => await module.close());

  it('Should return parameters returned successfully', async () => {
    const result = await getParameterValuesService.get(1, 8);
    expect(result.data).toEqual([
      { batchId: 8, parameterId: 1, enteredBy: 2, value: false },
      { parameterId: 6, batchId: 8, enteredBy: 2, value: false },
      { parameterId: 5, batchId: 8, enteredBy: 2, value: false },
      { parameterId: 3, batchId: 8, enteredBy: 2, value: false },
      { batchId: 8, parameterId: 4, enteredBy: 2, value: false },
    ]);
    expect(result.message).toEqual('Parameters returned successfully');
  });

  it('Should return user found!', async () => {
    await expect(getParameterValuesService.get(100, 8)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('Should return no parameters found!', async () => {
    await expect(getParameterValuesService.get(1, 80)).rejects.toThrow(
      NotFoundException,
    );
  });
});

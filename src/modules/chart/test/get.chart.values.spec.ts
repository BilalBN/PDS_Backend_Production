import { NotFoundException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { config } from '../../../configs/config';
import {
  databaseConfig,
  mongoDbConfig,
} from '../../../configs/database.config';
import { BatchChartSchema } from '../entities/chart.value.entity';
import { GetChartValuesService } from '../services/get.chart.values.service';

describe('Get chart values service test', () => {
  let getChartValueService: GetChartValuesService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        config,
        databaseConfig,
        mongoDbConfig,
        MongooseModule.forFeature([
          {
            schema: BatchChartSchema,
            name: 'batch_chart',
          },
        ]),
      ],
      providers: [GetChartValuesService],
    }).compile();
    getChartValueService = module.get(GetChartValuesService);
  });

  afterAll(async () => await module.close());

  it('Should return charts', async () => {
    const result = await getChartValueService.get(1, 1, 5);
    expect(result.message).toEqual('Charts returned successfully');
    expect(result.data).toEqual({
      chart: {
        subStepId: 5,
        enteredBy: 1,
        imageUrl: null,
        values: [
          { name: 'parameter_1', parameter_id: 1, value: '10' },
          { name: 'parameter_2', parameter_id: 2, value: '60' },
        ],
      },
      batchId: 1,
    });
  });

  it('Should return no charts found!', async () => {
    await expect(getChartValueService.get(1, 1, 100)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('Should return user found!', async () => {
    await expect(getChartValueService.get(100, 1, 1)).rejects.toThrow(
      NotFoundException,
    );
  });
});

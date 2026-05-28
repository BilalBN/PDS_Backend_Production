import { NotFoundException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { config } from '../../../configs/config';
import {
  databaseConfig,
  mongoDbConfig,
} from '../../../configs/database.config';
import { ChartValuesSchema } from '../entities/chat.value.entity';
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
            schema: ChartValuesSchema,
            name: 'CHART_VALUE',
          },
        ]),
      ],
      providers: [GetChartValuesService],
    }).compile();
    getChartValueService = module.get(GetChartValuesService);
  });

  afterAll(async () => await module.close());

  it('Should return charts', async () => {
    const result = await getChartValueService.get(1, 1, 1);
    expect(result.message).toEqual('Charts returned successfully');
    expect(result.data).toEqual([
      {
        batchId: 1,
        subStepId: 1,
        enteredBy: 12,
        values: [{ parameter_id: 10, value: 'test' }],
      },
    ]);
  });

  it('Should return user found!', async () => {
    await expect(getChartValueService.get(100, 1, 1)).rejects.toThrow(
      NotFoundException,
    );
  });
});
